const accountRouter = require('express').Router()
const {Accounts} = require('../db');
const { authMiddleware } = require('../middleware');

accountRouter.get('/balance',authMiddleware,async (req,res)=>{
    const userId = req.headers.userId;

    const balanceObj = await Accounts.findOne({userId})

    res.status(200).json({
        balance:balanceObj.balance
    })

})

accountRouter.post('/transfer',authMiddleware,async(req,res)=>{
    const myUserId = req.headers.userId;

    const toUserId = req.body.to;
    const amount = req.body.amount;

    const myBalanceObj = await Accounts.findOne({userId:myUserId})

    if(myBalanceObj.balance < amount){
        return res.status(400).json({
            message: "Insufficient balance"
        })
    }

    const toBalanceObj = await Accounts.findOne({userId:toUserId})

    if(!toBalanceObj){
        return res.status(400).json({
            message: "Invalid account"
        })
    }

    await Accounts.updateOne({userId:myUserId},{
        $inc: {
            balance: -amount
        }
    })

    await Accounts.updateOne({userId:toUserId},{
        $inc : {
            balance : amount
        }
    })

    res.status(200).json({
        message: "Transfer successful"
    })

})

module.exports  = {
    accountRouter
}