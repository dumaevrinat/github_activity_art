export function getSquares(date) {
    let squares = new Array(53 * 7);

    for (let i = 0; i < squares.length; i += 1) {
        let dayDate = new Date(date);
        dayDate.setDate(dayDate.getDate() + i);
        squares[i] = {
            date: dayDate,
            type: 0,
        }
    }

    return squares
}

export function generateCode(squares, maxCommitCount, func) {
    let result = '';

    if (maxCommitCount > 100) {
        maxCommitCount = 100;
    }

    if (maxCommitCount < 10) {
        maxCommitCount = 10;
    }

    for (let i = 0; i < squares.length; i += 1) {
        let commitCount = Math.floor((squares[i].type / 4) * maxCommitCount);

        for (let j = 0; j < commitCount; j += 1) {
            result += func(squares[i].date);
        }
    }

    return result
}

export function getCommandsWindows(date) {
    let dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T00:01`;

    return `date --rfc-3339='ns' > file.txt \ngit add --all && GIT_AUTHOR_DATE='${dateString}' GIT_COMMITTER_DATE='${dateString}' git commit -m 'Graph Data ${dateString}'\n`
}

export function getCommandsLinux(date) {
    let dateString = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}T00:01`;

    return `cat /dev/urandom | env LC_CTYPE=C tr -dc 'a-zA-Z0-9' | fold -w 32 | head -n 1 > file.txt \ngit add --all && GIT_AUTHOR_DATE='${dateString}' GIT_COMMITTER_DATE='${dateString}' git commit -m 'Graph Data ${dateString}'\n`

}