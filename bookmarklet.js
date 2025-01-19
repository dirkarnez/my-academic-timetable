// search for "Subject Group Code"
function getNearestAncestorByTagName(htmlElementNode, tagName) {
    let testNode = htmlElementNode;
    while (testNode != undefined && testNode.tagName != undefined && testNode.tagName.toLowerCase() != tagName) {
        testNode = testNode.parentNode;
        if (testNode == window.document) {
            return undefined;
        }
        // debugger;
        // if (htmlElementNode.tagName.toLowerCase() === tagName) {
        //     return htmlElementNode;
        // }
    }
    return testNode;
}

function titleCase(str) {
    str
    .toLowerCase()
    .split(/\s+/)
    .map(a => a.charAt(0).toUpperCase() + a.slice(1))
    .join(String.fromCharCode(0x20))
    .trim()
}

const TD_SUBJECT_CODE_INDEX = 0;
const TD_SUBJECT_TITLE_INDEX = 1;
const TD_SUBJECT_WEEKDAY_INDEX = 7;
const TD_SUBJECT_START_TIME_INDEX = 8;
const TD_SUBJECT_END_TIME_INDEX = 9;
const TD_SUBJECT_VENUE_INDEX = 10;

const output = Array
.from(document.getElementsByTagName('*'))
.filter(a => a.textContent == "Subject Group Code" && a.children.length == 0)
.reduce((prev, current) => {
    const nearestTable = getNearestAncestorByTagName(current, "table");
    return [
        ...prev, 
        ...Array
            .from(nearestTable.tBodies)
            .reduce((prevCourses, currentTBody) => {
                return [
                    ...prevCourses,
                    ...Array
                    .from(currentTBody.children)
                    .reduce((prevLine, currentTR) => {
                        return [
                            ...prevLine,
                            {
                                "subject_code": currentTR.children[TD_SUBJECT_CODE_INDEX].textContent.trim(),
                                "subject_title": titleCase(currentTR.children[TD_SUBJECT_TITLE_INDEX].textContent),
                                "weekday": currentTR.children[TD_SUBJECT_WEEKDAY_INDEX].textContent.trim(),
                                "start_time": currentTR.children[TD_SUBJECT_START_TIME_INDEX].textContent.trim(),
                                "end_time": currentTR.children[TD_SUBJECT_END_TIME_INDEX].textContent.trim(),
                                "venue": currentTR.children[TD_SUBJECT_VENUE_INDEX].textContent.trim()
                            }
                        ]
                    }, [])
                ]
            }, []
        )
    ];
}, []);

console.log(JSON.stringify(output));

