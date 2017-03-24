
if (typeof (PTP) === "undefined") {
    PTP = {};
    if (typeof (PTP.Resources) === "undefined") {
        PTP.Resources = {};
    }
    if (typeof (PTP.Controllers) === "undefined") {
        PTP.Controllers = {};
        PTP.Controllers.currentControllers = [];
    }
}