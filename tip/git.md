# stash

로컬에서 변경 사항이 존재하는 상태에서 원격의 변경사항을 pull 받을 때, conflict가 발생할 수 있습니다.  
이 때, git stash를 이용하면 로컬의 변경사항을 임시저장 할 수 있습니다.

```
1) 바로 pull 받는 경우
git pull origin main
conflict 발생

2) stash를 사용하여 로컬의 변경 사항을 임시 저장
git stash
git pull origin main
git stash pop

```

# 단일 브랜치 clone

원격 저장소에서 특정 브랜치만 clone하고 싶을 때!

```
git clone -b 브랜치명 --single-branch 경로
ex) git clone -b kowoohyuk --single-branch https://github.com/kowoohyuk/baemin-18.git
```
