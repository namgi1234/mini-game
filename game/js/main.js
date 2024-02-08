if (window.orientation == 0) {
    alert("We recommend running this service in landscape mode. You cannot enjoy 'flappy box' if it is not in landscape mode.")
    screen.orientation.lock("landscape")
}

function toggleFullScreen() {
    const element = document.documentElement;

    if (!document.fullscreenElement) {
        // 전체 화면으로 전환
        if (element.requestFullscreen) {
            element.requestFullscreen();
        } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
        } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen();
        } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
        }
    }
}

document.addEventListener('click',()=>{
    toggleFullScreen()
})