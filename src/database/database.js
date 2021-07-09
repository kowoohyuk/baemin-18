// import Nedb from 'nedb'

// // DB 설정
// const database = new Nedb({
//     filename : 'src/models/User.db', // DB 파일의 위치 및 이름
//     autoload : true // DB 생성시 파일 로드
// });

// export default database;

import Datastore from 'nedb-promises';
let database = Datastore.create('src/models/User.db');

export default database;
