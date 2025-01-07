multiple file upload

  @UseInterceptors(
    // Handle multiple file types: image and pdf
    FilesInterceptor('files', 2, { // 'files' key is used to upload both files
      fileFilter: (req, file, callback) => {
        const ext = extname(file.originalname).toLowerCase();
        if (['.jpg', '.jpeg', '.png'].includes(ext)) {
          return callback(null, true); // Image file
        } else if (ext === '.pdf') {
          return callback(null, true); // PDF file
        } else {
          return callback(
            new HttpException('Only JPG, PNG, and PDF files are allowed!', HttpStatus.BAD_REQUEST),
            false,
          );
        }
      },
      storage: diskStorage({
        destination: (req, file, cb) => {
          const fileExt = extname(file.originalname).toLowerCase();
          let uploadPath = '';
          if (['.jpg', '.jpeg', '.png'].includes(fileExt)) {
            uploadPath = path.resolve('./uploads/image');
          } else if (fileExt === '.pdf') {
            uploadPath = path.resolve('./uploads/cv');
          }

          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }

          cb(null, uploadPath);
        },
        filename: (req, file, callback) => {
          const randomName = Array(4)
            .fill(null)
            .map(() => Math.random().toString(36).substring(2, 15))
            .join('');
          const fileExtName = extname(file.originalname);
          const name = file.originalname.split('.')[0];
          callback(null, `${name}-${randomName}${fileExtName}`);
        },
      }),
    }),
  )
  ===============
  single file upload


  @UseInterceptors(
    FileInterceptor('file', { // Now handling single file
      fileFilter: (req, file, callback) => {
        const ext = extname(file.originalname).toLowerCase();
        if (['.jpg', '.jpeg', '.png'].includes(ext)) {
          return callback(null, true); // Image file
        } else if (ext === '.pdf') {
          return callback(null, true); // PDF file
        } else {
          return callback(
            new HttpException('Only JPG, PNG, and PDF files are allowed!', HttpStatus.BAD_REQUEST),
            false,
          );
        }
      },
      storage: diskStorage({
        destination: (req, file, cb) => {
          const fileExt = extname(file.originalname).toLowerCase();
          let uploadPath = '';
          if (['.jpg', '.jpeg', '.png'].includes(fileExt)) {
            uploadPath = path.resolve('./uploads/image');
          } else if (fileExt === '.pdf') {
            uploadPath = path.resolve('./uploads/cv');
          }

          if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
          }

          cb(null, uploadPath);
        },
        filename: (req, file, callback) => {
          const randomName = Array(4)
            .fill(null)
            .map(() => Math.random().toString(36).substring(2, 15))
            .join('');
          const fileExtName = extname(file.originalname);
          const name = file.originalname.split('.')[0];
          callback(null, `${name}-${randomName}${fileExtName}`);
        },
      }),
    }),
  )