//Подключение библиотеки bcryptjs для шифрования паролей
const bcrypt = require('bcryptjs')
//Подключение библиотеки jsonwebtoken для работы с токенами
const jwt = require('jsonwebtoken')
//Подключение модуля для создания пользователя
const User = require('../models/User')
const keys = require('../config/keys')

module.exports.login = async function(req, res){
    const candidate = await User.findOne({email: req.body.email})

    if(candidate){
        //Проверка пароля, пользователь существует
        const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)
        if(passwordResult){
            //Генерация токена, пароли совпали
            const token = jwt.sign({
                email: candidate.email,
                userId: candidate._id
            }, keys.jwt, {expiresIn: 60*60})
            
            res.status(200).json({
                token: `Bearer ${token}`
            })
        } else {
            //Ошибка о несовпадении пароля
            res.status(401).json({
                message: 'Пароли не совпадают. Попробуйте снова.'
            })
        }
    } else {
        //Пользователя нет, ошибка
        res.status(404).json({
            message: 'Пользователь с таким email не найден'
        })
    }
}

module.exports.register = async function(req, res){
    //Проверка на существующий email
    const candidate = await User.findOne({email: req.body.email})

    if(candidate) {
        //Если пользователь существует, нужно отправить ошибку
        res.status(409).json({
            message: 'Такой email уже занят. Попробуйте другой.'
        })
    } else {
        //Создаём нового пользователя
        //Генерация хэша для пароля
        const salt = bcrypt.genSaltSync(10)
        const password = req.body.password
        const user = new User({
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        })

        try {
            await user.save()
            res.status(201).json(user)
        } catch(e) {
            //Обработать ошибку
        }
    }
}
