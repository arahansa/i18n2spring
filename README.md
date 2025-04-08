
# i18n 스프링

## 사용용도
구글 엑셀 파일을 스프링 메시지파일로 변경해준다. 

## 사용 방법

1. 구글 excel credential 파일을 받아서 resources/messages 폴더에 i18nCred.json 파일로 둔다. 
2. resources/messages 폴더에 i18nGoogle.json 파일을 둔다. 설정파일이다. 

### 설정파일 예시

```json
{
  "basicLang": "ko", // 기본 언어
  "langs": ["ko", "en", "zh"], // 언어들
  "sheetId": "7720xxxxx", // 시트 아이디 (gid)
  "spreadSheetId": "1s4xxxxxxxxxxxxxxxxxxxxxx" // 스프레드 전체 시트 아이디 (브라우저 주소)
}
```


## 엑셀 양식

key_parent	| key_child |	key | 	분류 | 	ko	| en |	zh
comm | ranking | comm.ranking |	공통	| 순위	| Ranking |	排名
comm | waddress | comm.waddress	| 공통 | 지갑 주소 | Wallet address | 钱包地址

# 설치 

```
npm install -g i18ngooglesheet
```

# 실행
스프링 resources/messages 디렉터리에 가서 

i18ngooglesheet 를 실행하면 됩니다

# 예외 

## Invalid JWT Signature의 경우

credential 정보인 i18nCred.json이 잘못되어져있는 경우가 대부분입니다. 

# 구글 credential 파일에 대한 정보 

- 구글 클라우드 콘솔의 Google Sheets API 및 Google Drive API 사용 설정에 대한 사용자 인증정보 파일 입니다. 
- 다음 링크 참조 : https://posbar.tistory.com/260
