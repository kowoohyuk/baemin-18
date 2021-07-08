import Nedb from 'nedb'

// DB 설정
const db = new Nedb({
    filename : 'src/models/User.db', // DB 파일의 위치 및 이름
    autoload : true // DB 생성시 파일 로드
});

// 저장할 파일 예제
const userInfo = {
    email : 'jiho@naver.com',
    pwd : '1234',
    nickname : 'jiho',
    birth : '19950509'
};

// 데이터 저장
db.insert(userInfo, function (err, newDoc) {
    if(err) {
        console.log(err);
        return;
    }
    console.log('save! ',newDoc);
});

// 데이터 검색
db.find({
    email : 'jiho@naver.com'
}, function(err, doc){
    if(err) {
        console.log(err);
        return;
    }
    console.log('find! ',doc);
});
