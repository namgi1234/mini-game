export function getCookie (name){
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].trim();
        if (cookie.indexOf(name + '=') === 0) {
            return cookie.substring(name.length + 1);
        }
    }
    return null;
}

export function existingValue (name) {
    var Value = getCookie(name);
    if (!Value) {
        console.log(document.cookie)
        document.cookie = name + " = 0;"
      }
}

export function loadContent(url) {
    var element = document.getElementById('content-container');

    // 애니메이션 로직 추가 (예: 페이드 아웃, 슬라이드 등)
    // 간단히 하기 위해 색상 변경만 수행
    document.getElementById('1').style.color = 'red'; // 트랜지션 색상으로 변경하세요

    // 외부 페이지를 불러와 현재 페이지에 추가
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        // 페이지 내용을 변경
        element.innerHTML = xhr.responseText;

        // 불러온 페이지의 스크립트를 로딩 및 실행
        executeScripts(element);
      }
    };

    xhr.open('GET', url, true);
    xhr.send();
}

export function executeScripts(container) {
  // 불러온 페이지 내의 모든 스크립트를 찾아 실행
  var scripts = container.querySelectorAll('script');
  scripts.forEach(function (script) {
    var newScript = document.createElement('script');
    newScript.type = script.type || 'text/javascript';
    if (script.type === 'module') {
      // ES6 모듈 타입 처리
      newScript.type = 'module';
      newScript.src = script.src;
      document.head.appendChild(newScript);
    } else if (script.src) {
      // 외부 스크립트 파일을 로드
      newScript.src = script.src;
      document.head.appendChild(newScript);
    } else {
      // 인라인 스크립트 실행
      newScript.text = script.text;
      document.head.appendChild(newScript);
    }
  });
}

// export function loadContent(url) {
//   var element = document.getElementById('content-container');

//   // 애니메이션 로직 추가 (예: 페이드 아웃, 슬라이드 등)
//   // 간단히 하기 위해 색상 변경만 수행
//   document.getElementById('1').style.color = 'red'; // 트랜지션 색상으로 변경하세요

//   // 외부 페이지를 불러와 현재 페이지에 추가
//   var xhr = new XMLHttpRequest();
//   xhr.onreadystatechange = function () {
//     if (xhr.readyState === 4 && xhr.status === 200) {
//       // 페이지 내용을 변경
//       element.innerHTML = xhr.responseText;

//       // 불러온 페이지의 스크립트를 로딩 및 실행
//       executeScripts(element);
//     }
//   };

//   xhr.open('GET', url, true);
//   xhr.send();
// }

// export function executeScripts(container) {
//   // 불러온 페이지 내의 모든 스크립트를 찾아 실행
//   var scripts = container.querySelectorAll('script');
//   scripts.forEach(function (script) {
//     var newScript = document.createElement('script');
//     newScript.type = script.type || 'text/javascript';

//     if (script.type === 'module') {
//       // ES6 모듈 타입 처리
//       newScript.type = 'module';
//       newScript.src = script.src;
//       document.head.appendChild(newScript);
//     } else if (script.src) {
//       // 외부 스크립트 파일을 로드
//       newScript.src = script.src;
//       document.head.appendChild(newScript);
//     } else {
//       // 인라인 스크립트 실행
//       newScript.text = script.text;
//       document.head.appendChild(newScript);
//     }
//   });
// }