# 소스 클론 이후 빌드 방법

1. jvm, 웹서버 제품 등 종류 및 설정값, 버전
   * jvm : 
   * webserver : nginx/1.25.1
   ```
   # nginx.conf
    user  nginx;
    worker_processes  auto;
    error_log  /var/log/nginx/error.log warn;
    pid        /var/run/nginx.pid;
    events {
        worker_connections  1024;
    }
    http {
        include       /etc/nginx/mime.types;
        default_type  application/octet-stream;

        upstream backend {  #
            server 3.36.131.236:8081;
        }

        upstream frontend {
            server 3.36.131.236:3000;
        }

        server {
            underscores_in_headers on;
            add_header 'Access-Control-Allow-Origin' '*';
            server_name *.jeongchaegi.com;

            listen 80;

            location /api {
                if ($request_method = OPTIONS){
                    add_header 'Access_Control_Allow_Origin' '*' always;
                    add_header 'Access_Control_Allow_Methods' 'GET, POST, OPTIONS';
                    add_header 'Access_Control_Allow_Headers' 'Authorization, Bearer';
                    return 204;
                }
                proxy_pass http://backend/api;
            }

            location / {
                proxy_pass http://frontend/;
            }

            location /ws {
                proxy_pass http://backend/ws;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
                proxy_set_header Host $host;
                add_header 'Access-Control-Allow-Origin' 'http://3.36.131.236';

            }
        }
        server {
            underscores_in_headers on;
            add_header 'Access-Control-Allow-Origin' '*';
            server_name *.jeongchaegi.com;

            listen 443;
        }
        log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                        '$status $body_bytes_sent "$http_referer" '
                        '"$http_user_agent" "$http_x_forwarded_for"';
        access_log  /var/log/nginx/access.log  main;

        sendfile        on;
        keepalive_timeout  65;
        include /etc/nginx/conf.d/*.conf;
    }
   ```
2. 빌드 시 사용되는 환경변수 및 주요 내용
   * 환경 변수 없음
   * 백엔드 gradle 사용 빌드, 도커파일 존재
   * 포른트 node.js 사용 빌드, 도커파일 존재
3. 배포 시 특이사항
   * backend/ 위치 gradle 빌드 이후 도커파일 이용
4. 주요 계정 및 프로퍼티 정의된 파일 목록
   * \backend\src\main\resources\application.yml

# 외부 서비스 정보

* 카카오 소셜 로그인, 카카오 톡캘린더

# DB덤프 파일

# 시연 시나리오

- (비어있는 창과 톡캘린더 창 필요)
- 비어있는 창에서 jeongchaegi.com을 치고 사이트에 접속하기
- 메인 화면
    - 간단하게 구성 설명하기
- 정책 기능(`/policylist`)
    - 스크롤 내려서 리스트 보여주기
    - 청자들이 관심가질만한 정책 검색하고 선택하기
    - 상세 페이지 간단하게 설명하기
- 스크랩 기능(`/policydetail/[id]`)
    - 스크랩 등록 해보기
- 캘린더 일정 기능
    - 톡캘린더 설명하기
        
        > 여러분들 톡캘린더 한번씩은 써보셨죠? 일정도 등록하고 카카오톡 친구들과 공유할 수 있는 캘린더 기능입니다.
        > 
    - 일정 등록하고 톡캘린더 일정 확인하기
    - 일정 당일과 전날 아침 9시에 알림톡이 간다고 설명하기
- 정책 채팅창 기능(`/policydetail/[id]`)
    - 아래로 내려서 채팅창 보여주기
    - 채팅창 설명 (질문하거나 이외의 정보를 얻기)
    - 채팅창 이용하기
- 게시판 기능(`/article`)
    - 게시글 작성 블로그 에디터 보여주기
    - 다른 글 들어가서 블로그 뷰 보여주기
    - 댓글 하나 달기
    - 글 작성자 클릭해서 프로필 보기
    - 팔로우 하기
- 마이페이지 기능(`/mypage`)
    - 스크랩, 작성한 글, 팔로우 팔로워 간단히 설명하고 보여주기
- 마무리 멘트
