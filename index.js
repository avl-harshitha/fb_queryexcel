
module.exports = convert;


function convert(ref,attrib,seaparam,response)
{
  
  
  var resultSet = [],arr = [],myattrib = [];

  ref.once('value')
  .then(snap => {

    var value = Object.values(snap.val())
    var mkeys = Object.keys(value[0])//keys of the object in db

    if(attrib=='*')
    {
      myattrib = mkeys //selecting all keys
    }
    else if(attrib[0]=='-')
    {
      myattrib = mkeys.diff(attrib) //removing unnecessary keys
    }
    else
    {
      for(i=0;i<attrib.length;i++)
      {
        if(!attrib[i]in(mkeys))
        {
          console.error("attrib "+ attrib[i] + " doesnt exist"); //if given key by user doesnt exist
        }
        else
        {
          myattrib.push(attrib[i]); 
        }
      }
    }


    for(i=0;i<seaparam.length;i++)
    {
      if(myattrib.indexOf(seaparam[i][0])!=-1)
      arr.push(seaparam[i][0]); //validating and adding search parameters
    }
    
    snap.forEach(childsnap => {

        strobj = ''
        truthcount = 0; 

        for(i=0;i<myattrib.length;i++)
        {
            var objval = childsnap.val()[myattrib[i]] //obtaining value from a given key
            var mindex = arr.indexOf(myattrib[i]) //checking if that key is in search parameters

            if(mindex!=-1) //if key in search param
            {
                //evaluating if value satisfies given condition by user
                if(!evaluate(objval,seaparam[mindex][1],seaparam[mindex][2],seaparam[mindex][3]))
                {
                  break;
                }
                else{
                  truthcount++; //increasing count of object
                }
            }
            if(x!=undefined)
              {strobj += objval + ','} //converting to csv
        }

        if(truthcount==arr.length) //adding the object only if all search params satisfy the condition
      {resultSet.push(strobj)}
      
  })
  console.log(resultSet)

  //sending the response as an csv file
  let file = Buffer.from(resultSet.join('\n'),'utf8');
   response.writeHead(200,{
     'Content-Type': 'application/CSV',
     'Content-disposition':"attachment; filename = project.csv",
   });
   response.end(file);
  
})
.catch(error => {
      //handle the error
      console.log(error)
    })


    //function to eval conditions on search param given by user
function evaluate(var1,operator,var2,var3)
{
    if(typeof var1!= typeof var2)
      return console.error("Limit not of type of the object"+var1);
    if(operator=='<>'&&var3==undefined)
      return console.error("Second limit not defined");
    if(!(operator == '<'||operator == '>'||operator == '>='||operator == '<='||operator=='=='||operator=='<>'))
    {
      return console.error("operator not valid");
    }
    
    if(typeof var1=='string')
    {
      return var1==var2
    }
    else
    {
      if(operator == '<'||operator == '>'||operator == '>='||operator == '<='||operator=='==')
      return eval(var1+''+operator+''+var2)
      if(operator == '<>')
      return eval(var1>var2&&var1<var3)
    }
      
}

//function to find difference of 2 arrays
Array.prototype.diff = function(a) {
  return this.filter(function(i) {return a.indexOf(i) < 0;});
};

}