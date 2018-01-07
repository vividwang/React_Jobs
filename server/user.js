/**
 * Created by w on 2017/12/5.
 */
const express = require('express');
const utils = require('utility');
const router = express.Router();
const User = require('./model').getModule('user');
const Chat = require('./model').getModule('chat');
const _filter = {'pwd': 0, __v: 0};//设置过滤条件

//Chat.remove({},(e,d)=>{});
router.get('/list', (req, res, next) => {
    const {type} = req.query;
    //User.remove({},(err,docs)=>{});
    User.find({type}, (err, docs) => {
        if (err) {
            console.log('Error found: ' + err);
        } else {
            return res.json({code: 0, data: docs});
        }
    })
});

router.post('/register', (req, res, next) => {
    let {user, pwd, type} = req.body;

    User.findOne({user}, (err, docs) => {
        if (err) {
            console.log('Error found: ' + err);
        }
        if (docs) {
            return res.json({code: 1, msg: '用户名已存在！'});
        }

        let userModel = new User({user, type, pwd: md5Pwd(pwd)});

        userModel.save((err, docs) => {
            if (err) {
                return res.json({code: 1, msg: "服务器出错了！"});
            }
            let {user, type, _id} = docs;

            res.cookie('userId', _id);
            return res.json({code: 0, data: {user, type}});
        });
        // User.create({user,type,pwd:md5Pwd(pwd)},(err,docs)=>{
        //     if (err) {
        //         return res.json({code:1,msg:"服务器出错了！"});
        //     }
        //     return res.json({code:0});
        // })  create()方法拿不到用户id
    })
});

function md5Pwd(pwd) {
    const salt = 'zheshiyigeReactApp123#$4$$@！';

    return utils.md5(utils.md5(pwd + salt));
}

router.post('/login', (req, res, next) => {
    const {user, pwd} = req.body;

    User.findOne({user, pwd: md5Pwd(pwd)}, _filter, (err, docs) => {//第一个argument是查询参数，第二个是显示参数。
        if (err) {
            return res.json({code: 1, msg: '服务端出现问题！'});
        }
        if (!docs) {
            return res.json({code: 1, msg: '用户名或密码错误！'});
        }

        res.cookie('userId', docs._id);
        return res.json({code: 0, data: docs});
    })
});

router.post('/update', (req, res, next) => {
    let userId = req.cookies.userId; //防止有两个窗口，一个窗口注销了，一个窗口正在发送请求的情况。

    if (!userId) {
        return res.json({code: 1});
    }

    const body = req.body;
    console.log(body);

    User.findByIdAndUpdate(userId, body, (err, docs) => {
        if (err) {
            return res.json({code: 1, msg: '服务端出现问题！'});
        }
        let data = Object.assign({}, {
            user: docs.user,
            type: docs.type
        }, body);

        console.log(data);

        return res.json({code: 0, data: data})
    })

});

router.get('/info', (req, res, next) => {
    const {userId} = req.cookies;

    if (!userId) {
        return res.json({code: 1});
    }
    User.findOne({_id: userId}, _filter, (err, docs) => {
        if (err) {
            return res.json({code: 1, msg: '服务端出现错误！'});
        }
        if (docs) {
            return res.json({code: 0, data: docs})
        }

    })
});

router.get('/getmsglist', (req, res, next) => {
    const user = req.cookies.userId;

    User.find({}, (err, docs) => {
        if (err) {
            return res.json({code: 1, msg: '服务端出现错误！'});
        }

        let users  = {};

        docs.forEach(v=>{
            users[v._id] = {name:v.user,avatar:v.avatar};
        });

        Chat.find({'$or':[{form:user},{to:user}]},(err,docs)=>{
            if (err) {
                return res.json({code: 1, msg: '服务端出现错误！'});
            }

            return res.json({code:0,msgs:docs,users:users});
        })
    });

});

router.post('/readmsg',(req,res,next)=>{
    const userid = req.cookies.userId;
    const {from} = req.body;

    console.log('from:'+from,'userId:'+userid);

    Chat.update({from,to:userid},
        {'$set':{'read':true}},
        {'multi':true},//修改多个数据
        function (err,docs) {
        console.log(docs);
            if (err) {
                return res.json({code: 1, msg: '服务端出现错误！'});
            }
            console.log(docs);
            return res.json({code:0,num:docs.nModeified});
        })
});

module.exports = router;