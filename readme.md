# 마후봇<br>본격 씹덕의 덕질하기! 마후봇입니다!

# 무슨봇인가요?
해당 봇은 제작자가 만들고 싶어서 만든 카카오톡용 덕질봇입니다.<br>
[메신저봇R](https://play.google.com/store/apps/details?id=com.xfl.msgbot)를 이용해 구현하였으며 단순하게 노래 종류를 정하고,<br>
가사의 일부분을 보고 정답을 맞추는 봇입니다.

# 어떻게 적용하나요?
아래 절차를 따라서 적용하면 무리 없이 적용할수 있습니다.

## STEP1. 소스 다운로드
깃허브 릴리즈 탭으로 가서 코드를 다운받아주세요.<br>
그다음으로 메신저봇에서 봇을 만든후 다운받은 소스를 적용시켜주세요.

## STEP2. 소스 수정(필수)
적용한 소스 5번째 줄에 *scriptName*를 자신이 생성한 봇 이름으로 바꿔주세요.
```js
//example
//before
const scriptName = "마후봇";
//edit
const scriptName = "덕질봇";
```
그다음 바로 다음줄인 6번째 줄에 *scriptPath*를 자신이 생성한 봇의 경로로 바꿔주세요.
```js
//example
//before
const scriptPath = "/sdcard/msgbot/Bots/마후봇";
//edit
const scriptPath = "/sdcard/kakaoBot/Bots/덕질봇";
```

## STEP2-1. 소스 수정(선택)
적용한 소스의 config값을 변경하여 설정을 변경할수 있습니다.<br>
자세한 설명은 소스내 주석에 적혀있습니다.
```js
let config = {
    "timeout": 30000, // 타임오버 시간(단위: ms, 기본: 30초(30000ms))
    "type": "9 9", // artist vocal 순(기본: 9(미지정) 9(미지정))
    "enableAdminFunction": false, // 관리자 기능 활성화 여부(기본: false)
    "adminHash": null, // 관리자 기능 활성화시 관리자 프로필 해시(기본: null)
    "minimumCorrectSimilarity": 85, // 정답으로 처리할 최소 유사도(기본: 85)
    "autoUpdateDB": true, // DB 자동 업데이트(기본: true)
    "autoUpdateScript": true // 스크립트 자동 업데이트(기본: true)
};
```

## STEP3. 컴파일/DB다운로드/소스 업데이트
소스를 컴파일하고 봇으로 아무 메시지를 보냅니다. 첫번째로 봇에서 DB 다운로드 완료 알림이 표시되며 DB파일이 /sdcard/mafumafu DB.db로 저장됩니다.
두번째로 만약 봇이 구버전이라면 봇 업데이트 완료 알림이 표시되며 위에서 지정한 스크립트 경로에 소스가 적용되고 재컴파일됩니다.

## STEP4. 사용
이제 사용하시면 됩니다.
```
[기본 명령어]
!노래 맞추기 - 노래 맞추기를 시작합니다.
!게임 설정 <입력 시간 | 노래 종류 | 정답 정확도> ... - 게임 설정을 변경합니다.

[관리자 전용 명령어] // config변수에서 enableAdminFunction값을 true로 변경하고 adminHash를 관리자의 프로필 해시로 변경해야 사용 가능함
~<js 명령어> - 이발을 수행합니다.
!DB 재다운로드 - DB를 다시 다운로드 합니다.
!소스 업데이트 - 소스 업데이트를 확인합니다.
!DB 정보 - DB의 버전과 패치노트를 확인합니다.
```
# 안내사항
해당 소스의 DB다운로드는 자체 서버에서 DB파일을 업로드하여 그걸 여러분이 다운로드하는 방식으로 진행됩니다.<br>
여기까지는 문제가 없어 보이지만 그 서버는 램 3기가가 탑재된 휴대폰에서 돌아가고 있기 때문에 매우 연약합니다.<br>
따라서 DB파일이 온전함에도 계속 다운로드하거나 하는 서버에 무리를 주는 행동을 삼가해주세요.<br>
그리고 DB파일은 제가 직접 일일이 만든것이기 때문에 일부분 이상한 부분이 있을 수 있습니다. 알려주시면 빠르게 변경하겠습니다.<br>
또한 제가 아파치는 아직 미숙하기 때문에 보안이슈가 있을수 있는데 제보와 함께 해결방법을 알려주시면 차차 해결해가겠습니다.<br>

# 작동 스크린샷
![KakaoTalk_20210213_190717175](https://user-images.githubusercontent.com/59216834/108587272-189a8300-7396-11eb-8551-949caa12dccb.jpg)
![KakaoTalk_20210213_190717175_01](https://user-images.githubusercontent.com/59216834/108587274-19cbb000-7396-11eb-8d56-7e0eaa5a49f4.jpg)
![KakaoTalk_20210213_190717175_02](https://user-images.githubusercontent.com/59216834/108587275-1a644680-7396-11eb-9ba0-e8d7089b85ba.jpg)
![KakaoTalk_20210213_190717175_03](https://user-images.githubusercontent.com/59216834/108587276-1afcdd00-7396-11eb-8298-54137be05069.jpg)
![KakaoTalk_20210213_190717175_04](https://user-images.githubusercontent.com/59216834/108587277-1b957380-7396-11eb-9bdf-2b32389a34a5.jpg)
![KakaoTalk_Snapshot_20210220_160841](https://user-images.githubusercontent.com/59216834/108587278-1c2e0a00-7396-11eb-891e-e1be6908b610.png)
![KakaoTalk_Snapshot_20210220_160902](https://user-images.githubusercontent.com/59216834/108587280-1c2e0a00-7396-11eb-8a2c-fd3701303457.png)