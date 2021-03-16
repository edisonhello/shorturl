
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log(__dirname);

export default async () => {
  return {
    rootDir: __dirname,
    projects: [
      {
        displayName: 'frontend',
        moduleFileExtensions: ["js", "vue"],
        transform: {
          "^.+\\.js$": "babel-jest",
          "^.+\\.vue$": "vue-jest"
        },
        setupFiles: [
          "<rootDir>/test/frontend/setup.js",
        ]
      }
    ]
  };
}