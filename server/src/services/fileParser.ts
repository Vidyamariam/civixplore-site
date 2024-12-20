// import { Upload } from "@aws-sdk/lib-storage";
// import { S3Client } from "@aws-sdk/client-s3";
// import { Transform } from "stream";
// import formidable, { Fields, Files, File } from "formidable";
// import { Request } from "express";


// // Extend the File type to add custom properties and methods
// interface CustomFile extends File {
//   _writeStream?: Transform;
//   open?: () => Promise<void>;
//   end?: (cb: () => void) => void;
//   emit?: (event: string, data?: any) => void;
// }


// const accessKeyId = process.env.AWS_ACCESS_KEY_ID!;
// const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY!;
// const region = process.env.S3_REGION!;
// const Bucket = process.env.S3_BUCKET!;

// const parsefile = async (req: Request): Promise<any> => {
//   return new Promise((resolve, reject) => {
//     const options = {
//       maxFileSize: 100 * 1024 * 1024, // 100 MBs
//       allowEmptyFiles: false,
//     };

//     const form = formidable(options);

//     form.parse(req, (err: Error | null, fields: Fields, files: Files) => {
//       if (err) {
//         reject(err.message);
//       }
//     });

//     form.on("error", (error) => {
//       reject(error.message);
//     });

//     form.on("field", (name, value) => {
//       if (name === "successUpload") {
//         resolve(value);
//       }
//     });

//     form.on("fileBegin", (formName, file: CustomFile) => {
//       file.open = async function () {
//         this._writeStream = new Transform({
//           transform(chunk, encoding, callback) {
//             callback(null, chunk);
//           },
//         });
      
//         this._writeStream.on("error", (e: any) => {
//           form.emit("error" as any, e); // Type assertion for custom "error" event
//         });
      
//         try {
//           const upload = new Upload({
//             client: new S3Client({
//               credentials: {
//                 accessKeyId,
//                 secretAccessKey,
//               },
//               region,
//             }),
//             params: {
//               ACL: "public-read",
//               Bucket,
//               Key: `${Date.now().toString()}-${this.originalFilename}`,
//               Body: this._writeStream,
//             },
//             queueSize: 4,
//             partSize: 1024 * 1024 * 5,
//             leavePartsOnError: false,
//           });
      
//           const data = await upload.done();
//           form.emit("fileBegin" as "data", "successUpload", JSON.stringify(data) );

//         } catch (err:any) {
//           form.emit("error" as any, err); // Type assertion for custom "error" event
//         }
//       };
      
//       file.end = function (cb: () => void) {
//         this._writeStream?.on("finish", () => {
//           this.emit?.("end"); // Custom "end" event
//           cb();
//         });
//         this._writeStream?.end();
//       };
      
//     });
//   });
// };

// export default parsefile;

