var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var CryptoJS = require("crypto-js");

 

app.post('/newpoll', urlencodedParser, function (req, res, next) {

    //console.log(JSON.stringify(req.body));
    let Name = req.body.Name;
    let graphVal = req.body.graphVal;
    let User = req.body.User;
    // res.json({ working: (req.body) });
    //find one name and then add create name to 
    
    Person.findOne({ name: User }, function (err, docs) {
        if (err) errorhandler(err);
        if (docs) {
            var Polls = docs.polls;
            Polls.push({ name: Name, graphValue: [] });//console.log(Polls);
            for (let x = 0; x <= graphVal.length - 1; x++) {
                Polls[Polls.length - 1].graphValue.push({ name: graphVal[x], graphValue: 0 });
               
             

            } //console.log(Polls[Polls.length - 1]._id);
            docs.save(function (err, docsaved) {
                if (err) console.log(err);
                //console.log(Polls[Polls.length - 1]);
                res.redirect('/polls/'+Polls[Polls.length - 1]._id+"/"+docs._id);
            });
            // res.send(Polls[Polls.length - 1]);
            // docs.polls.Name.push(graphVal); $inc:{graphValue: 1}

        } else {
            const kitty = new Person({ ip: 0, social: 'home', name: 'unregistered', url: '', id: 1, });
            kitty.save().then(() => console.log('new Person save' + docs));
        }
    });


}).get('/polls/:sid/:mid',urlencodedParser,   function (req, res, next) {
let sendName =req.query.hide;

    var color=[];
    let subID = req.params.sid;
    let mainID = req.params.mid;// res.json({_id:subID, mid:mainID});
    // res.json({ working: (req.body) });
    //find one name and then add create name to 
    if(subID!=""){
    var config = {
        type: 'pie',
        data: {
            datasets: [{
                data:[],
                backgroundColor: '',
                label: String,
				borderColor: 'blue',
				borderWidth: 1,
            }],
            labels: []
        },
        options: {
            responsive: false/* ,
        scales: { yAxes: [{ ticks: {   beginAtZero:true } }]}*/ }
    };


    Person.findById(mainID, function(err, docs){
                   
        if (err) errorHandler(err);
        if (docs) {
           
     var subdoc = docs.polls.id(subID);
    // console.log(docs.name);
     var voteButtons ="";
     if(subdoc===null) return res.send('<h1>was deleted   <a href="/">Home</a><h1>');
         let subdates = subdoc.graphValue;    
            for (let x = 0; x <= subdates.length - 1; x++) {
                                          config.data.datasets[0].data.push(subdates[x].graphValue);
config.data.labels.push(subdates[x].name);
voteButtons+=' <input type="radio" class="votebutton" name="votebutton" value="'+subdates[x]._id+'" >'+subdates[x].name+'<br>';
   
   }
 let encrypt=  CryptoJS.AES.encrypt(docs.name, 'secret_key_123');
 console.log("plain   "+encrypt);
let visibledelete = '';console.log("plain   "+sendName.toString());
var bytes  = CryptoJS.AES.decrypt(sendName.toString(), 'secret_key_123');

var plaintext = bytes.toString(CryptoJS.enc.Utf8);


console.log("plain   "+plaintext);
     if(docs.name!==plaintext ){ visibledelete = ' disabled ';}   
let deleteButton ='<a role="button" type="button" class="btn-group btn btn-danger'+ 
visibledelete+'" href="/delete/'+subID+'/'+mainID+'">Delete poll</a>';        

            //rgb(39, 27, 127)", "#9e0142", "#d53e4f", "#f46d43", "#fdae61", "#fee08b", "#ffffbf", "#e6f598", "#abdda4", "#66c2a5", "#3288bd", "#5e4fa2", "#a6cee3", "#1f78b4", "#b2df8a", "#33a02c", "#fb9a99", "#e31a1c", "#fdbf6f", "#ff7f00", "#cab2d6", "#6a3d9a", "#ffff99", "#b15928", "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf", "#1b9e77", "#d95f02", "#7570b3", "#e7298a", "#66a61e", "#e6ab02", "#a6761d", "#666666"  
     // let shuffled = color.map((a) => ({sort: Math.random(), value: a})).sort((a, b) => a.sort - b.sort) .map((a) => a.value);'+          
//d3.interpolateRainbow() .range(["red", "white", "green"])d3.scaleOrdinal(d3.interpolateRainbow).domain([0, '+JSON.stringify()+ ' ]) ;"rgb(45, 27, 127)",...d3.schemeSpectral[5],...d3.schemePaired,...d3.schemeDark2
var addcolor =' "#fee08b", "#5e4fa2","#e31a1c" , "#abdda4",';
if(subdates.length > 4)  {
for(let x=4;x<subdates.length;x++ ){
 addcolor+=   "' #"+Math.floor(Math.random()*16777215).toString(16)+"'";
 if(x<subdates.length-1) addcolor+= ',';
    //https://www.paulirish.com/2009/random-hex-color-code-snippets/<script src="https://d3js.org/d3-scale-chromatic.v1.min.js"></script><script src="https://d3js.org/d3-color.v1.min.js"></script><script src="https://d3js.org/d3-interpolate.v1.min.js"></script>
}
}
  

res.format({

                html: function () {
                    res.send(
                        '<link href="/stylesheets/style.css" rel="stylesheet"></link>'+
                         '<script src="/javascripts/jquery-3.3.1.min.js" type="text/javascript"> </script>'+
                        '<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/css/bootstrap.min.css">'+
                        '<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.0/js/bootstrap.min.js"></script>' + 
   '<script src="/javascripts/Chart.min.js"></script><main"><div class="mainContent"> <canvas  id="myChart" width="400" height="400"></canvas>' +
                        '<script>' +
                        'window.onload = function() {' +
                        'var ctx = document.getElementById("myChart").getContext("2d");' +
                         'var color =['+addcolor+']; '+
                                                 
                         'var config='+JSON.stringify(config)+";"+ 
                         ' console.log(color);'+
                       
                        ' config.data.datasets[0].backgroundColor=color;'+                       
                        "var myChart = new Chart(ctx,   config  )}; </script>"+
                         '<form   id="formVote" method="get" action="/vote/'+subID+'/'+mainID+'" >'+                      
                      ' <div >' +(voteButtons) +'</div>'+
                       '  <input id="formVoteSubmit" class="btn-group btn btn-primary" value="send vote" type="submit">'+
                       '</form></div>'+
                        '<div class="btn-group btn-group-justified">'+
                        '<a role="button" class="btn-group btn btn-primary" href="/">Home</a>'+
                        deleteButton+
                       ' </div>'+
                       '<script>'+
                       '$(document).ready(function () {'+
                       '$("#formVoteSubmit").click(function () {'+
                          ' var IsChecked = $(".votebutton").is(":checked");'+
                        'if(!IsChecked){alert("select something");}})'+
                      '  });</script></main>'
                      
                        );
                }
            });

            // docs.polls.Name.push(graphVal); $inc:{graphValue: 1}

       } else{
            res.send('no id find');
        }
 

}) ;

}else{
   res.redirect("/"); 
}
}).get('/delete/:sid/:mid',  function (req, res, next) {

   

    let subID = req.params.sid;
    let mainID = req.params.mid;
    if(subID!=""){
    Person.findById(mainID, function(err, docs){
                   
        if (err) errorHandler(err);
        if (docs) {
           
     var subdoc = docs.polls.id(subID);
     var pollName = "";
    if(subdoc){pollName =  subdoc.name; subdoc.remove();}
docs.save(function (err) {
  if (err) return handleError(err);
 res.send('<h2>'+docs.name +' the poll '+ pollName+' was removed       <a href="/">Home</a></h2>' );
});
        }
    });

}else{
    res.redirect("/"); 
 }

}).get('/vote/:sid/:mid',  function (req, res, next) {

//res.json({id:req.params, query:req.query.votebutton});

let subID = req.params.sid;
let mainID = req.params.mid;
let votebutton_id=req.query.votebutton;
console.log(votebutton_id);
console.log( typeof subID==="undefined" || typeof  votebutton_id==="undefined");
if((typeof subID==="undefined" || typeof  votebutton_id==="undefined")===false){
Person.findById(mainID, function(err, docs){
               
    if (err) errorHandler(err);
    if (docs) {
       
 var subdoc = docs.polls.id(subID).graphValue.id(votebutton_id);
 var pollName = "";
   console.log("187"+ subdoc);
if(subdoc){
    pollName =  subdoc.name;// $inc:{graphValue: 1};
  console.log( subdoc.graphValue);
subdoc.graphValue++;
 docs.save(function (err) {
if (err) return handleError(err);
res.redirect('back'); 

//res.send('<h2>'+docs.name +' the poll value '+ pollName+' was updated       <a href="/">Home</a></h2>' );
});
}}   
});    
 

}else{
res.redirect('back'); 
}






});

module.exports = router;