const Recommend = require("../../model/Recommend");
// const qs = require('querystring');
// const url = require('url')
const Until = require('../../until/until');

// 分页获取数据
module.export =  PageShowRecommend =  (req,res) => {
    let num = parseInt(req.query.pageSize);
    let skipPage = parseInt(req.query.pageSize);
    console.log(num,skipPage);
    // let arg = url.parse(req.url,true).query;
    let arg = req.query.state;
    Until.EachQueryDataBase({state:arg}, num || 5, skipPage || 0, Recommend).then(res => {
        if(!res) {
            return res.status(404).json("没有查询到数据！")
        }
        else {
            return res.json(res);
        }
    }).catch(err => {
        console.log(err);
    })
}