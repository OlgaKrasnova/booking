const Order = require('../models/Order')
const errorHandler = require('../utils/errorHandler')

//Получение всех заказов
module.exports.getAll = async function(req, res) {
    //Формирование фильтра
    const query = {
        user: req.user.id
    }

    //Проверка даты старта
    if(req.query.start) {
        query.date = {
            //Больше или равно
            $gte: req.query.start
        }
    }

    //Проверка даты конца
    if(req.query.end) {
        if(!query.date) {
            query.date = {}
        }

        query.date['$lte'] = req.query.end
    }

    //Проверка номера заказа
    if(req.query.order) {
        query.order = +req.query.order
    }

    try {
        const orders = await Order
            .find(query)
            .sort({date: -1})
            .skip(+req.query.offset)
            .limit(+req.query.limit)
        res.status(200).json({orders})
    } catch (e) {
        errorHandler(res, e)
    }
}

//Создание заказа
module.exports.create = async function(req, res) {
    try {
        //Определяем последний заказ (заказ с самой новой датой)
        const lastOrder = await Order
            .findOne({user: req.user.id})
            .sort({date: -1})

        const maxOrder = lastOrder ? lastOrder.order : 0

        const order = await new Order({
            list: req.body.list,
            user: req.user.id,
            order: maxOrder + 1
        }).save()
        res.status(201).json(order)
    } catch(e) {
        errorHandler(res, e)
    }
}
