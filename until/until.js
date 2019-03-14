// 定义一个查询总数的方法
/** 
 *query:查询的条件 
 *DataBase:查询的是哪一个集合
*/
const AllCount = async (query, DataBase) =>{
    let allCount = await DataBase.find(query).count();
    return allCount;
}

// 定义分页查询
const EachQueryDataBase = async (query, limit, skip, DataBase) => {
    console.log("page");
    // 定义查询分页数据
    let EachQueryData = async () => {
        return await DataBase.find(query).limit(Number(limit)).skip(Number(skip)).exec((err, data) => {
            if(err) {
                return err;
            }
            else {
                return data || [];
            }
        });
    }
    // 解构赋值
    /** 
     * allCount  ==> AllCount(query,DataBase)  使用变量allCount意在调用这个方法
     * eqData ==> EachQueryData()     使用变量eqData意在调用这个方法
     * 结果是返回这个函数执行的结果
    */
    let [allCount, eqData] = await Promise.all([
        AllCount(query,DataBase),
        EachQueryData()
    ])
    return {
        count: allCount,
        eqData: eqData
    }
}
module.exports = {
    EachQueryDataBase
}