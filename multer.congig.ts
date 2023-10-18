import { diskStorage } from 'multer'

export const multerConfig = {
  storage: diskStorage({
    destination: (req, file, cb) => {
      cb(null, './uploads'); // Путь для сохранения файлов
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname);
    },
  }),
};