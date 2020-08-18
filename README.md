# comucol-subcounty-API

node app.js

# localhost:4000/api/labstats/wardstats
     to get stats from the ward level

# localhost:4000/api/labstats/postlabstats
                to post stats (takes in json) in this format: 
                            
                            Example
                              {
                                "ward":"kaptagat",
                                "testsDone":42,
                                 "positive":8,
                                 "recovered":5,
                                  "deaths":2
                              }
