function main() {
    function updateTime() {
        document.getElementById('time_now')
            .innerHTML = (new Date()).toLocaleTimeString('ru');
    }

    setInterval(updateTime, 500);
}

main();
