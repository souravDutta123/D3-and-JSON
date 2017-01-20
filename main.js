var fs= require("fs");
var HashMap= require('hashmap');

var writerStream0 = fs.createWriteStream('myJsIndicators1.json',{
  flags: "a",
  encoding: "UTF8",
  mode: 0744
});
var writerStream1 = fs.createWriteStream('myJsIndicators2.json',{
  flags: "a",
  encoding: "UTF8",
  mode: 0744
});
var writerStream2 = fs.createWriteStream('myJsIndicators3.json',{
  flags: "a",
  encoding: "UTF8",
  mode: 0744
});
var lineReader = require('readline').createInterface({
  input: require('fs').createReadStream('Indicators.csv')
});
var x=0;
var header;
var elements;
var flag=0;
var headerMap=new HashMap();
//1.variables and prerequisites of all Asian countries
var maleInd="SP.DYN.LE00.MA.IN";
var femaleInd="SP.DYN.LE00.FE.IN";
var asianCountries = new Set();
asianCountries.add("AFG");
asianCountries.add("ARM");
asianCountries.add("AZE");
asianCountries.add("BHR");
asianCountries.add("BGD");
asianCountries.add("BTN");
asianCountries.add("BRN");
asianCountries.add("KHM");
asianCountries.add("CHN");
asianCountries.add("CXR");
asianCountries.add("CCK");
asianCountries.add("IOT");
asianCountries.add("GEO");
asianCountries.add("HKG");
asianCountries.add("IND");
asianCountries.add("IDN");
asianCountries.add("IRN");
asianCountries.add("IRQ");
asianCountries.add("ISR");
asianCountries.add("JPN");
asianCountries.add("JOR");
asianCountries.add("KAZ");
asianCountries.add("KWT");
asianCountries.add("KGZ");
asianCountries.add("LAO");
asianCountries.add("LBN");
asianCountries.add("MAC");
asianCountries.add("MYS");
asianCountries.add("MDV");
asianCountries.add("MNG");
asianCountries.add("MMR");
asianCountries.add("NPL");
asianCountries.add("PRK");
asianCountries.add("OMN");
asianCountries.add("PAK");
asianCountries.add("PSE");
asianCountries.add("PHL");
asianCountries.add("QAT");
asianCountries.add("SAU");
asianCountries.add("SGP");
asianCountries.add("KOR");
asianCountries.add("LKA");
asianCountries.add("SYR");
asianCountries.add("TWN");
asianCountries.add("TJK");
asianCountries.add("THA");
asianCountries.add("TUR");
asianCountries.add("TKM");
asianCountries.add("ARE");
asianCountries.add("UZB");
asianCountries.add("VNM");
asianCountries.add("YEM");

var male = new  HashMap();
var female=new HashMap();
var maleCountryCount = new  HashMap();
var female=new HashMap();
var femaleCountryCount = new  HashMap();



//2.variables of Birth rate crude, India
var birthCrudeInd="SP.DYN.CBRT.IN";
var deathCrudeInd="SP.DYN.CDRT.IN";
var ind="IND";
var yearWiseBirthCrude=new  HashMap();
var yearWiseDeathCrude=new  HashMap();


//3.variables of Life expectancy total
var allCountriesLET= new HashMap();
var letInd="SP.DYN.LE00.IN";


for(xxx=1960;xxx<2016;xxx++)
{
  male.set(xxx.toString(),0);
  female.set(xxx.toString(),0);
  maleCountryCount.set(xxx.toString(),0);
  femaleCountryCount.set(xxx.toString(),0);
  yearWiseBirthCrude.set(xxx,0);
  yearWiseDeathCrude.set(xxx,0);
}



lineReader.on('line', function (line) {

  var data=new Array();
  if(x==1){
    //model the data
    elements=line.split(',');
    if(elements[1] === "AFG")
      flag=1;
    if(flag == 1)
    {
    for(each=0,d=0;each<header.length;each++,d++)
    {
      s='';
      if(elements[d].charAt(0)=='\"')
      {
        if(elements[d].charAt(elements[d].length-1)=='\"'&&elements[d].length!=1)
        {
          elements[d]=elements[d].slice(1,elements[d].length-1);
        }
        else
        {
          s=elements[d].slice(1,elements[d].length)+',';
          d++;
          while(!(elements[d].charAt(elements[d].length-1)=='\"'))
          {
            s+=elements[d]+',';
            d++;
          }
          s+=elements[d].slice(0,elements[d].length-1);
          elements[d]=s;
        }
      }
      data[each]=elements[d];
    }

    //1.Asian countries birth expectancy
    if(asianCountries.has(data[headerMap.get("CountryCode")]))
    {
        if(data[headerMap.get("IndicatorCode")] === maleInd)
        {
          male.set(data[headerMap.get("Year")] , male.get(data[headerMap.get("Year")])+Number(data[headerMap.get("Value")]));
        }
        if(data[headerMap.get("IndicatorCode")] === maleInd)
        {
          female.set(data[headerMap.get("Year")] , female.get(data[headerMap.get("Year")])+Number(data[headerMap.get("Value")]));
        }
    }

    //2.Birth rate crude, India
    if(data[headerMap.get("CountryCode")] === ind )
    {
      if(data[headerMap.get("IndicatorCode")] === birthCrudeInd)
      {
        yearWiseBirthCrude.set(data[headerMap.get("Year")] , Number(data[headerMap.get("Value")]));
      }
      if(data[headerMap.get("IndicatorCode")] === deathCrudeInd)
      {
        yearWiseDeathCrude.set(data[headerMap.get("Year")] , Number(data[headerMap.get("Value")]));
      }
    }

    //3.Top five countries
    if(data[headerMap.get("IndicatorCode")] === letInd)
    {
      if(allCountriesLET.has(data[headerMap.get("CountryName")]))
      {
        allCountriesLET.set(data[headerMap.get("CountryName")], allCountriesLET.get(data[headerMap.get("CountryName")])+Number(data[headerMap.get("Value")]));
      }
      else
      {
        allCountriesLET.set(data[headerMap.get("CountryName")], 0);
      }
    }

  }
  }
  else
  {
      header=line.split(",");
      for(xxx=0;xxx<header.length;xxx++)
      {
        headerMap.set(header[xxx],xxx);
      }
      x++;
  }



});

lineReader.on('close', function () {
  var obj;
  var arr=new Array();
  var arr1=new Array();

  var totCountry=asianCountries.size;
  for(xxx=1960;xxx<2016;xxx++)
  {
    //1.Asian countries
    obj=new Object();
    obj.year=""+xxx;
    obj.male=male.get(obj.year)/totCountry;
    obj.female=female.get(obj.year)/totCountry;
    arr.push(obj);
    //2.India
    obj=new Object();
    obj.year=""+xxx;
    obj.Birth=yearWiseBirthCrude.get(obj.year);
    obj.Death=yearWiseDeathCrude.get(obj.year);
    arr1.push(obj);
  }
  writerStream0.write(JSON.stringify(arr));
  writerStream1.write(JSON.stringify(arr1));

  //3.Top countries
  var maxCname="";
  var max=0;
  arr=new Array();
  for(xxx=0;xxx<5;xxx++)
  {
    obj=new Object();
    max=0;
    allCountriesLET.forEach(function (value, country) {
      if(max<value)
      {
        max=value;
        maxCname=country;
      }
    });
    obj.Country=maxCname;
    obj.letValue=max/44;
    allCountriesLET.set(maxCname, 0);
    arr.push(obj);
  }
  writerStream2.write(JSON.stringify(arr));

  console.log("XXXXXXXXX");
});
