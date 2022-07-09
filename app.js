import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import fileUpload from 'express-fileupload';
import history from 'connect-history-api-fallback';
import path from 'path';


const app = express(); 

// Middlewares
app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(fileUpload({useTempFiles: true})); //uso de archivos temporales 

// Routes
app.use('/',  require('./routes/auth.routes'));
app.use('/admin',  require('./routes/admin.routes'));

// Middlewares for Vue
app.use(history());
app.use(express.static(path.join(__dirname, "public")));

// Settings
app.set('port', 8080);

app.listen(app.get('port'), () => {
    console.log("The port is " + app.get('port') );
})