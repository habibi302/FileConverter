import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import PDFDocument from 'pdfkit';
import fs from 'fs';

const testFolder = './images/';
var allUploadedFiles = [];

const app = express();

app.use('/images',express.static('images'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());


const storage = multer.diskStorage({
    destination: function(req, file, callback){
            callback(null, './images/');
    },
    filename: function(req, file, callback){
            callback(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});

const fileFilter = (req, file, callback)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype == 'image/png'){
           callback(null, true); 
    }else{
            callback(null, false);
    }
};

const upload = multer({storage: storage, limits: {
    fileSize: 1024 * 1024 * 20
},
fileFilter: fileFilter
}); 



app.post("/combine", (req, res)=>{

   const doc = new PDFDocument({autoFirstPage:false});

    //Pipe its output somewhere, like to a file or HTTP response 
    //See below for browser usage 
    doc.pipe(fs.createWriteStream('output.pdf'))
    
    
    // //Add an image, constrain it to a given size, and center it vertically and horizontally 

    req.body.paths.forEach((path)=>{
      var img = doc.openImage('./images/'+path);
          
          doc.addPage({size: [img.width, img.height]})
          .image(img,0,0);
     });


    doc.end() 

    res.send("PDF Created!");
});


app.get("/download",(req, res)=>{
  res.download("./output.pdf");
});


app.post("/upload",upload.array("image"), function(req, res){
    console.log("Clicked!");
    var allfilepaths = [];

    req.files.map((val, key)=>{
            allfilepaths[key] = val.path;
    });


    var i = 0;
    fs.readdirSync(testFolder).forEach(file => {
        i++;
        allUploadedFiles.push({id: i.toString(), file: file});
      });


    res.send(allUploadedFiles);
    allUploadedFiles = [];

});

app.get("/getfiles",function(req, res){
    var i = 0;
    fs.readdirSync(testFolder).forEach(file => {
        i++;
        allUploadedFiles.push({id: i.toString(), file: file});
      });


    res.send(allUploadedFiles);

    allUploadedFiles = [];
});


app.post("/delete", (req, res)=>{
    fs.unlink("./images/"+req.body.filepath, (err)=>{
        if(err){
            console.log("not deleted!");
        }else{
            var i = 0;
            fs.readdirSync(testFolder).forEach(file => {
            i++;
            allUploadedFiles.push({id: i.toString(), file: file});
            });
            res.send(allUploadedFiles);
            allUploadedFiles = [];
        }
    })
})


app.post("/deleteall",(req, res)=>{
    function deleteFiles(files, callback){
        var i = files.length;
        files.forEach(function(filepath){
          fs.unlink("./images/"+filepath.file, function(err) {
            i--;
            if (err) {
              callback(err);
              return;
            } else if (i <= 0) {
              callback(null);
            }
          });
        });
      }
      
      deleteFiles(req.body.filepaths, function(err) {
        if (err) {
          res.send(err);
        } else {
          res.send('all files removed');
        }
      });
})


app.listen(3001, ()=>{
    console.log("Server Started Successfully on port 3001!");
});