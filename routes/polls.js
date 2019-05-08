var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });




router.post('/newpoll', urlencodedParser, function (req, res, next) {

     console.log(JSON.stringify(req.body));
    let pollName = req.body.pollName;
    let graphVal = req.body.graphVal;
     let graphTest = req.body.demo;
    let graphType = req.body.graphType;
    let comment = req.body.comment;

    let User_id = req.session.user._id;
    // res.json({ working: (req.body) });
    //find one name and then add create name to 


    Person.findOne(User_id != 'unregistered' ? { _id: User_id } : { ip: req.ip }, function (err, docs) {
        if (err) errorhandler(err);
        if (docs) {
            var Polls = docs.polls;
            Polls.push({ name: pollName, graphValue: [], type: graphType, comment: comment, test:graphTest=='on'?true:false });//console.log(Polls);
            for (let x = 0; x <= graphVal.length - 1; x++) {
                Polls[Polls.length - 1].graphValue.push({ name: graphVal[x], graphValue: 0 });
            } //console.log(Polls[Polls.length - 1]._id);
            docs.save(function (err, docsaved) {
                if (err) console.log(err);
                //console.log(Polls[Polls.length - 1]);
                res.redirect('/polls/' + Polls[Polls.length - 1]._id + "/" + docs._id + "?" + 'hide=' + JSON.stringify(User_id));
            });
            // res.send(Polls[Polls.length - 1]);

        } else {
            const kitty = new Person({ ip: 0, social: 'home', name: 'unregistered', url: '', id: 1, });
            kitty.save().then(() => console.log('new Person save' + docs));
        }
    });

}).get('/polls/:sid/:mid', function (req, res, next) {
    //let send_id = req.query.hide;

    var color = [];
    let subID = req.params.sid;
    let mainID = req.params.mid;// res.json({_id:subID, mid:mainID});
    // res.json({ working: (req.body) });
    //find one name and then add create name to 
    if (subID != "") {
        var config = {
            type: 'bar',
            data: {
                datasets: [{
                    data: [],
                    backgroundColor: '',
                    label: [],
                    borderColor: 'blue',
                    borderWidth: 1,
                }],
                labels: []
            },
            options: { scales: {
            xAxes: [{
                stacked: true
            }],
            yAxes: [{
                stacked: true
            }]},
                legend: { display: true },
                responsive:false,
                title: {
                    display: true,
                    text: ''
                }/* ,
        scales: { yAxes: [{ ticks: {   beginAtZero:true } }]}*/ }
        };
let amDataset=[];

        Person.findById(mainID, function (err, docs) {

            if (err) errorHandler(err);
            if (docs) {
                var subdoc = docs.polls.id(subID);
                //console.log(docs);
                var voteButtons = [];
                if (subdoc === null) return res.send('<h1>was deleted   <a href="/">Home</a><h1>');
                let subdates = subdoc.graphValue;
                for (let x = 0; x <= subdates.length - 1; x++) {
                    
                    amDataset.push({name:subdates[x].name,value:subdates[x].graphValue});
                    config.data.datasets[0].data.push(subdates[x].graphValue);
                    config.data.labels.push(subdates[x].name);
                    config.data.datasets[0].label.push(subdates[x].name);
                    voteButtons.push({ subdatesId: subdates[x]._id, subdatesName: subdates[x].name });

                } let visibledelete = '';
                let user= req.session.user;
                let user_id=user?user._id:"";
                //console.log(docs._id.toString()+'\n'+JSON.parse(send_id));
                //console.log(docs.polls);
                if (docs._id.toString() !== user_id) { visibledelete = ' disabled '; }
                let votedIpAndUser = subdoc.votedIpAndUser;
                let comment = subdoc.comment || "";
                console.log(99+JSON.stringify(req.session));
                //rgb(39, 27, 127)", "#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#5e4fa2", "#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928", "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf", "#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666"  
                // let shuffled = color.map((a) => ({sort: Math.random(), value: a})).sort((a, b) => a.sort - b.sort) .map((a) => a.value);'+          
                //d3.interpolateRainbow() .range(["red", "white", "green"])d3.scaleOrdinal(d3.interpolateRainbow).domain([0, '+JSON.stringify()+ ' ]) ;"rgb(45, 27, 127)",...d3.schemeSpectral[5],...d3.schemePaired,...d3.schemeDark2
                var addcolor = [ "#fee08b", "#5e4fa2","#e31a1c" , "#abdda4"];
                if (subdates.length > 4) {
                    for (let x = 4; x < subdates.length; x++) {
                        addcolor.push( " #" + Math.floor(Math.random() * 16777215).toString(16) );
                      //  if (x < subdates.length - 1) addcolor += ',';
                        //https://www.paulirish.com/2009/random-hex-color-code-snippets/<script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script><script src="https://d3js.org/d3-color.v1.min.js"></script><script src="https://d3js.org/d3-interpolate.v1.min.js"></script>
                    }
                } var userip = req.ip; let addoption = true;
                var visibleAddOption = 'visibility: visible;';
                 //= (JSON.parse(send_id));
                if (user_id === "") {
                    user_id = userip;
                    addoption = false;
                    visibleAddOption = 'visibility: hidden;';
                }
                var subdocpolls = docs.polls.id(subID);
                var alreadyVoted = false;
                console.log(subdocpolls.votedIpAndUser);
                config.options.title.text = subdocpolls.name;
                config.type = subdocpolls.type === 'undefined' ? 'pie' : subdocpolls.type;
                config.options.legend.display = subdocpolls.type !== "bar" ? true : false;

                if (subdocpolls.votedIpAndUser.includes(user_id) || votedIpAndUser.includes(userip)) {
                    subdocpolls.votedIpAndUser.push(user_id);
                    docs.save();
                    alreadyVoted = true;
                    console.log('aleready voted');
                }else{
                    
                }
                if(subdocpolls.test===true){
                    alreadyVoted=false;
                }
                
               // console.log(user);
                res.render('pollchartjs', { user: user, test:subdocpolls.test,
                     window: {amDataset:amDataset, graphType:config.type, config: config, addcolor: addcolor,alreadyVoted: alreadyVoted },
                     comment:comment, voteButtons: voteButtons, visibleAddOption: visibleAddOption,
                    visibledelete: visibledelete, subID: subID, mainID: mainID
                });
               

            } else {
                res.send('no id find');
            }


        });

    } else {
        res.redirect("/");
    }
}).get('/delete/:sid/:mid', function (req, res, next) {



    let subID = req.params.sid;
    let mainID = req.params.mid;

    if (subID != "") {
        Person.findById(mainID, function (err, docs) {

            if (err) errorHandler(err);
            if (docs) {

                var subdoc = docs.polls.id(subID);
                var pollName = "";
                if (subdoc) { pollName = subdoc.name; subdoc.remove(); }
                docs.save(function (err) {
                    if (err) return handleError(err);
                    res.format({
                        html: function () {
                            res.send('<link href="/stylesheets/style.css" rel="stylesheet"></link>' +
                                '<script src="/javascripts/jquery-3.3.1.min.js" type="text/javascript"> </script>' +
                                '<body onload="load()" > <div    id="deleteMsg" ><h2>' + docs.name + ', the poll ' + pollName +
                                ' was succesfully removed       <a  href="/">Home</a></h2></div></body>' +
                                '<script ">' +
                                'function load() {' +
                                ' setTimeout( function (){' +
                                'window.location.href="/"   ;},3000);' +
                                '}' +
                                '</script>');
                        }
                    });
                });
            }
        });

    } else {
        res.redirect("/");
    }

}).get('/vote/:sid.:mid.:userid', function (req, res, next) {

    //res.json({id:req.params, query:req.query.votebutton});
    console.log(196+JSON.stringify(req.query));
    let subID = req.params.sid;
    let mainID = req.params.mid;
    let user_id = req.params.userid;
    let votebutton_id = req.query.votebutton;
    console.log(votebutton_id);
    //console.log( typeof subID==="undefined" || typeof  votebutton_id==="undefined");
    if ((typeof subID === "undefined" || typeof votebutton_id === "undefined") === false) {
        Person.findById(mainID, function (err, docs) {

            if (err) errorHandler(err);
            if (docs) {
                var subdocpolls = docs.polls.id(subID);
                var subdocgV = docs.polls.id(subID).graphValue.id(votebutton_id);
                var pollName = "";

                if (subdocgV) {
                    pollName = subdocgV.name;// $inc:{graphValue: 1};
                    //forbid vote again
                    console.log("187"+subdocgV);
                    if (!subdocpolls.votedIpAndUser.includes(user_id)||subdocpolls.test===true) {
                        subdocpolls.votedIpAndUser.push(user_id);
                        subdocpolls.votedIpAndUser.push(req.ip);
                        subdocgV.graphValue++;
                        docs.save(function (err) {
                            if (err) return handleError(err);
                        });
                    }

                } res.redirect('back');
            }
        });


    } else {
        res.redirect('back');
    }






}).post('/addvote/:sid.:mid.:userid', function (req, res, next) {


    console.log(JSON.stringify(req.params));

    console.log(JSON.stringify(req.body));
    let subID = req.params.sid;
    let mainID = req.params.mid;
    let user_id = req.params.userid;
    let addVote = req.body.addVote;
    console.log(addVote);
    //console.log( typeof subID==="undefined" || typeof  votebutton_id==="undefined");
    if ((typeof subID === "undefined" || typeof addVote === "undefined") === false) {
        Person.findById(mainID, function (err, docs) {

            if (err) errorHandler(err);
            if (docs) {
                var subdocpolls = docs.polls.id(subID).graphValue;
                console.log(JSON.stringify(subdocpolls));



                if (subdocpolls) {
                    subdocpolls.push({ name: addVote });// $inc:{graphValue: 1};
                    //forbid vote again
                    console.log("187" + subdocpolls);


                    docs.save(function (err) {
                        if (err) return handleError(err);
                    });



                    res.redirect('back');
                    //res.send('<h2>'+docs.name +' the poll value '+ pollName+' was updated       <a href="/">Home</a></h2>' );

                }
            }
        });
    }
});
module.exports = router;
 /*       res.format({
      
                          html: function () {
                              res.send(
                                  '<link href="/stylesheets/style.css" rel="stylesheet"></link>' +
                                  '<script src="/javascripts/jquery-3.3.1.min.js" type="text/javascript"> </script>' +
                                  '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">' +
                                  '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>' +
                                  '<script src="/javascripts/Chart.min.js"></script>' +
                                  '<main>' +
                                  '<div class="mainContent">' +
                                  '<canvas height="400" width="400" id="myChart"></canvas>' +
                                  '<aside id="votePanel">' +
                                  '<form   id="formVote" method="get" action="/vote/' + subID + '.' + mainID + '.' + JSON.parse(send_id) + '" >\n' +
                                  '<div>' + (voteButtons) + '</div>\n' +
                                  '<input id="formVoteSubmit" class="btn btn-primary shaddowbtn" value="send vote" type="submit">\n' +
                                  '</form>' +
                                  '<form style="' + visibleAddOption + '" id="VoteformAddoption" method="post" action="/addvote/' + subID + '.' + mainID + '.' + JSON.parse(send_id) + '">' +
                                  '<input id="formAddVoteSubmit" class="btn btn-info shaddowbtn" value="Add vote" type="submit">' +
                                  '<input id="addOption" type="text" class="osansfont" placeholder="addoption" name="addVote"  required="required">' +
                                  '</form>' +
                                  '<div id="voteComment"><p>' + comment + '</p></div>' +
                                  '</aside>' +
                                  '<div id="footBtn" class="btn-group btn-group-justified">\n' +
                                  '<a role="button" class="btn-group btn-primary" href="/">Home</a> \n' +
                                  '<a role="button" rel="me" id="tweet-quote" class="btn-group btn-info twitter-share-button" target="_blank" href="" >Share</a>\n' +
                                  deleteButton +
                                  ' </div></div></div>\n' +
                                  '<script>' + '$(document).ready(function () {\n' +
      
                                  'var ctx = document.getElementById("myChart").getContext("2d");\n' +
                                  'var color =[' + addcolor + ']; \n' +
                                  'var config=' + JSON.stringify(config) + ";\n" +
                                  ' config.data.datasets[0].backgroundColor=color;\n' +
                                  '$("#tweet-quote").attr("href", encodeURI("https://twitter.com/intent/tweet?text="+config.options.title.text+"|&url="+window.location.href));' +
                                  'var myChart = new Chart(ctx,   config  );\n' +
                                  '$("#formVoteSubmit").click(function () {\n' +
                                  ' var IsChecked = $(".votebutton").is(":checked");' +
                                  'if(!IsChecked){alert("select something");}' +
                                  'if(' + alreadyVoted + '){alert("You have already vote");}' +
                                  '});' +
                                  '  });</script></main>'
                              );
                          }
                      }); */

                // docs.polls.Name.push(graphVal); $inc:{graphValue: 1}   