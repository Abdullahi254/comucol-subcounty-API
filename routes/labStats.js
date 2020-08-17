const route = require('express').Router()
const Labs = require('../models/Labs')

// posting the lab data to the database
route.post('/postlabstats',(req,res)=>{
    let errors = []
    if(!req.body.testsDone||isNaN(req.body.testsDone)){
        errors.push({
            testsDone:'error'
        })
    }
    else if(!req.body.positive||isNaN(req.body.positive)){
        errors.push({
            positive:'error'
        })
    }
    else if(!req.body.recovered||isNaN(req.body.recovered)){
        errors.push({
            recovered:'error'
        })
    }

    else if(!req.body.deaths||isNaN(req.body.deaths)){
        errors.push({
            deaths:'error'
        })
    }
    else if(!req.body.ward||!isNaN(req.body.ward)){
        errors.push({
            ward:'error'
        })
    }
    if(errors.length>0){
        console.log(errors)
        res.status('403').send(errors)
    }else{
        //using aggregate method to query data, grouping and sum
        const totalDeathsAndTests = Labs.aggregate(
            [
                {
                    $group:{
                    _id:"$ward",
                    totalTests:{
                        $sum:"$testsDone"
                    },
                    totalDeaths:{
                        $sum:"$deaths"
                    }
                    }
                }
            ]
        )
    const labs = new Labs({
        testsDone:req.body.testsDone,
        positive:req.body.positive,
        recovered:req.body.recovered,
        deaths:req.body.deaths,
        ward:req.body.ward
    })
    // saving to database and catching error if promise pushes one
    labs.save()
        .then(latestTests=>{
            
            console.log('saved labs successfully')
            totalDeathsAndTests.then(groupedByWard=>{
                res.status('200').send({latestTests,groupedByWard})
            }).
            catch(er=>{
                console.log(er)
            })
        })
        .catch(er=>{
            res.status(404).send({'could not save':er})
            console.log('error saving labs')
        })
    }
        
})
// getting statistics from the ward level
route.get('/wardstats',(req,res)=>{
    const wardstats = Labs.aggregate([
        {
            $group:{
                _id:"$ward",
                latestTestsDate:{
                    $last:"$date"
                },
                latestCases:{
                    $last:"$testsDone"
                },
                totalTests:{
                    $sum:"$testsDone"
                },
                totalPositive:{
                    $sum:"$positive"
                },
                totalRecoveries:{
                    $sum:"$recovered"
                },
                totalDeaths:{
                    $sum:"$deaths"
                }
            }
        }
    ])

    wardstats.then(wardstats=>{
        res.status(200).send(
            {
                wardstats
            }
        )
    })
})


module.exports = route