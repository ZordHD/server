const fs = require('fs');
const { Documents } = require('../models/models');
const uuid = require('uuid');
const path = require('path');
const mime = require('mime-types');
const ApiError = require('../error/ApiError');

class documentsController {
    async create(req, res, next) {
        try {
            const { name, text } = req.body;
            const { file } = req.files;
            let fileName = uuid.v4() + path.extname(file.name);
            let filePath = path.resolve(__dirname, '../', 'static', fileName);

            // Проверка расширения файла
            if (!['.docx', '.pdf'].includes(path.extname(file.name))) {
                return next(ApiError.badRequest('Недопустимое расширение файла'));
            }

            // Сохранение файла в файловой системе
            file.mv(filePath);

            // Сохранение пути к файлу в базе данных
            const document = await Documents.create({ name, text, file: fileName });
            return res.json(document);
        } catch (error) {
            next(ApiError.internal(error.message));
        }
    }

    async getAll(req, res) {
      let {limit, page} = req.query
      page = page || 1
      limit = limit || 3
      let offset = page * limit - limit

      let documents = await Documents.findAndCountAll({
          limit: parseInt(limit),
          offset: parseInt(offset),
      });
      return res.json(documents);
  }

  async download(req, res, next) {
    try {
        const { id } = req.params;
        const document = await Documents.findByPk(id);

        if (!document) {
            return next(ApiError.badRequest('Документ не найден'));
        }

        const filePath = path.join(__dirname, '..', 'static', document.file);
        if (fs.existsSync(filePath)) {
            const mimeType = mime.lookup(filePath);
            res.setHeader('Content-Type', mimeType);
            res.download(filePath, document.file);
        } else {
            next(ApiError.badRequest('Файл не найден'));
        }
    } catch (error) {
        next(ApiError.internal(error.message));
    }
}
}

module.exports = new documentsController();