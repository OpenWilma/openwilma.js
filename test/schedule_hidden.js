function _typeof(e) {
    return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    }
    : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    }
    )(e)
}
var FrontpageSchedule = {
    dataLayers: [],
    elements: {
        calendar: null,
        editingElem: null,
        events: null,
        schedule: null,
        selectReservationDefaultElem: null,
        sidePanel: null,
        sidePanelReservation: null,
        wtActivityType: null,
        wtBinding: null,
        wtBindingContainer: null,
        wtBtnRemoveWorktime: null,
        wtBtnSaveWorktime: null,
        wtConfirmRemoveDialog: null,
        wtCourseType: null,
        wtEndTime: null,
        wtExtraInfo: null,
        wtDatePicker: null,
        wtLessonIdentifier: null,
        wtNoReservationsInfobox: null,
        wtReservationCategory: null,
        wtReservationList: null,
        wtSearchReservation: null,
        wtSelSchedule: null,
        wtSelScheduleContainer: null,
        wtSelectedReservation: null,
        wtSidepanel: null,
        wtStartTime: null
    },
    role: "",
    mode: "",
    addAppointments: !1,
    skipChangeMonthYear: !1,
    isFetchingEvents: !1,
    formkey: "",
    translations: null,
    hasEventsCache: [],
    availableReservations: null,
    selectedDay: 0,
    selectedMonth: 0,
    selectedYear: 0,
    selectedKurreType: "",
    selectedScheduleID: 0,
    selectedReservationID: 0,
    maxReservationCaptionLength: 100,
    extraInfoFromKurre: "",
    lessonIdentifierFromKurre: "",
    getTranslations: function() {
        var e;
        switch (document.documentElement ? document.documentElement.lang : "") {
        case "sv":
            e = {
                exam: "Prov",
                exams: "Prov ",
                "other-exams": "Andra prov",
                "exam-subject": "Tema: ",
                event: "Händelse: ",
                navigateToAppt: "Gå till kalenderinbjudan",
                events: "Händelser ",
                schedule: "Schema ",
                sender: "Avsändare",
                allevents: "Valda dagens händelser",
                participants: "Deltagare",
                invitation: "Inbjudna",
                "no-schedule": "Dagens schema är tomt.",
                "no-events": "Inga händelser.",
                "new-event": "Ny inbjudan",
                today: "idag",
                tomorrow: "imorgon",
                yesterday: "igår",
                notes: "Lektionsanteckningar",
                diary: "Lektionsdagbok",
                grading: "Bedömning",
                "new-worktime": "Registrera arbetstid",
                "edit-worktime": "Ändra arbetstid",
                required: "är ett obligatoriskt fält",
                "invalid-endtime": "Sluttiden måste infalla efter inledningstiden",
                "too-short-reservation": "Minsta möjliga reservation är 5 minuter",
                coursetype: "Kurstyp",
                tasktype: "Uppgiftens typ",
                "res-required": "Välj resurs för placering",
                hours: "Timmar",
                notfound: "Hittade ingen information om placeringen",
                "conn-fail": "Kontakten med Wilma är bruten eller så är funktionen inte tillåten.",
                "schedule-not-found": "Schema saknas.",
                "not-allowed": "Otillåten data",
                bound: "Bunden",
                unbound: "Obunden",
                unregulated: "Oreglerad",
                "too-many-resources": "... och %s andra"
            };
            break;
        case "en":
            e = {
                exam: "Exam",
                exams: "Exams ",
                "other-exams": "Other exams",
                "exam-subject": "Subject: ",
                event: "Event: ",
                navigateToAppt: "Go to event invitation",
                events: "Events ",
                schedule: "Schedule ",
                sender: "Sender",
                allevents: "Events on chosen day",
                participants: "Participants",
                invitation: "Invited",
                "no-schedule": "Days schedule is empty.",
                "no-events": "No events.",
                "new-event": "Send event invitation",
                today: "today",
                tomorrow: "tomorrow",
                yesterday: "yesterday",
                notes: "Lesson notes",
                diary: "Lesson diary",
                grading: "Grading",
                "new-worktime": "Register working time",
                "edit-worktime": "Edit working time",
                required: "must be filled in",
                "invalid-endtime": "The end time must be later than the start time",
                "too-short-reservation": "The reservation has to be at least 5 minutes long",
                coursetype: "Course type",
                tasktype: "Type of activity",
                "res-required": "Select resource for placement",
                hours: "Lessons",
                notfound: "No available information about the activity",
                "conn-fail": "Connection to Wilma server has ended or this function is not allowed.",
                "schedule-not-found": "Schedule not found.",
                "not-allowed": "Invalid data",
                bound: "Teaching",
                unbound: "Non-teaching",
                unregulated: "Unregulated",
                "too-many-resources": "... and %s others"
            };
            break;
        default:
            e = {
                exam: "Koe",
                exams: "Kokeet ",
                "other-exams": "Muita kokeita",
                "exam-subject": "Aihe: ",
                event: "Tapahtumavaraus: ",
                navigateToAppt: "Siirry tapahtumakutsuun",
                events: "Tapahtumat ",
                schedule: "Työjärjestys ",
                sender: "Lähettäjä",
                allevents: "Valitun päivän tapahtumat",
                participants: "Osallistujia",
                invitation: "Kutsuttuja",
                "no-schedule": "Päivän työjärjestys on tyhjä.",
                "no-events": "Ei tapahtumia.",
                "new-event": "Uusi tapahtumakutsu",
                today: "tänään",
                tomorrow: "huomenna",
                yesterday: "eilen",
                notes: "Tuntimerkinnät",
                diary: "Tuntipäiväkirja",
                grading: "Arviointi",
                "new-worktime": "Kirjaa työaikaa",
                "edit-worktime": "Muokkaa työaikaa",
                required: "on pakollinen kenttä",
                "invalid-endtime": "Päättymisajan on oltava suurempi kuin alkamisajan",
                "too-short-reservation": "Pienin mahdollinen varaus on 5 minuuttia pitkä",
                coursetype: "Kurssityyppi",
                tasktype: "Tehtävän tyyppi",
                "res-required": "Valitse sijoitettava resurssi",
                hours: "Tunteja",
                notfound: "Tietoja sijoituksesta ei löytynyt",
                "conn-fail": "Ei yhteyttä Wilmaan tai toiminto ei ole salittu.",
                "schedule-not-found": "Työjärjestystä ei löytynyt",
                "not-allowed": "Ei sallittu tieto",
                bound: "Sidottu",
                unbound: "Sitomaton",
                unregulated: "Sääntelemätön",
                "too-many-resources": "... ja %s muuta"
            }
        }
        return e
    },
    dateIsSelected: function() {
        return 0 < this.selectedDay && 0 < this.selectedMonth && 0 < this.selectedYear
    },
    hoursToNumber: function(e) {
        return e = (e = e.replace(/[^\-\+0-9,]/g, "")).replace(",", "."),
        parseFloat(e)
    },
    updateSidepanelDate: function() {
        FrontpageSchedule.elements.wtDatePicker.val(FrontpageSchedule.getSelectedDateFinnish())
    },
    handleSelectedReservationClicked: function(e) {
        $(e.target).is("a") && e.preventDefault(),
        FrontpageSchedule.elements.sidePanelReservation.show()
    },
    handleEditWorktimeLinkClicked: function(e) {
        var t = $(e.target)
          , n = t.closest(".reservation-event");
        e.stopPropagation(),
        t.is("a") && e.preventDefault(),
        e = anyToNumber(n.data("schedule-id"), 0),
        n = anyToNumber(n.data("reservation-id"), 0),
        FrontpageSchedule.selectedScheduleID = e,
        FrontpageSchedule.selectedReservationID = n,
        FrontpageSchedule.elements.wtSelectedReservation.removeAttr("orig-worktime"),
        FrontpageSchedule.mode = "edit",
        FrontpageSchedule.fetchSchedules()
    },
    removeWorktime: function(e, t) {
        var n = {}
          , a = getRolePrefix() + "/schedule/removeworktime";
        n.formkey = FrontpageSchedule.formkey,
        n.scheduleID = e,
        n.reservationID = t,
        $.ajax({
            type: "POST",
            url: a,
            data: n,
            success: function(e) {
                try {
                    e.success ? (FrontpageSchedule.handleOnChangeMonthYear(FrontpageSchedule.selectedYear, FrontpageSchedule.selectedMonth, function() {
                        FrontpageSchedule.changeDay(FrontpageSchedule.selectedDay, FrontpageSchedule.selectedMonth, FrontpageSchedule.selectedYear, !1)
                    }),
                    FrontpageSchedule.elements.wtConfirmRemoveDialog.modal("hide"),
                    notificationsSave(e.message),
                    FrontpageSchedule.elements.sidePanel.hide()) : "string" == typeof e.message ? FrontpageSchedule.showErrors(e.message.split("\r\n")) : FrontpageSchedule.showErrors(e.errors)
                } catch (e) {
                    FrontpageSchedule.showErrors([e])
                }
            },
            error: function() {
                alert(FrontpageSchedule.translations["conn-fail"]),
                document.location.reload(!0)
            }
        })
    },
    handleCancelRemoveWorktimeBtnClicked: function() {
        FrontpageSchedule.elements.wtConfirmRemoveDialog.modal("hide")
    },
    handleConfirmRemoveWorktimeBtnClicked: function() {
        var e = FrontpageSchedule.selectedScheduleID
          , t = FrontpageSchedule.selectedReservationID;
        FrontpageSchedule.removeWorktime(e, t)
    },
    handleRemoveWorktimeBtnClicked: function() {
        FrontpageSchedule.elements.wtConfirmRemoveDialog.modal()
    },
    handleDatePickerDateChanged: function() {
        var t, n, a, e = FrontpageSchedule.elements.wtDatePicker.val().split("."), r = {};
        3 !== e.length && (e = formatDate("t", "dd.mm.yyyy").split(".")),
        t = anyToNumber(e[0], 0),
        n = anyToNumber(e[1], 0),
        a = anyToNumber(e[2], 0),
        r.Date = t + "." + n + "." + a,
        r.ScheduleID = FrontpageSchedule.selectedScheduleID,
        r.ReservationID = FrontpageSchedule.getSelectedReservationID(),
        $.get(getRolePrefix() + "/schedule/fetchscheduleisallowed", r, function(e) {
            try {
                e.IsAllowed ? (FrontpageSchedule.selectedDay = t,
                FrontpageSchedule.selectedMonth = n,
                FrontpageSchedule.selectedYear = a,
                FrontpageSchedule.elements.calendar.datepick("setDate", new Date(a,n - 1,t)),
                FrontpageSchedule.fetchSchedules(!0)) : (FrontpageSchedule.showErrors([e.Message]),
                FrontpageSchedule.elements.wtDatePicker.val(FrontpageSchedule.selectedDay + "." + FrontpageSchedule.selectedMonth + "." + FrontpageSchedule.selectedYear))
            } catch (e) {
                alert(e)
            }
        }).fail(function(e) {
            alert(FrontpageSchedule.translations["conn-fail"] + e),
            document.location.reload(!0)
        })
    },
    createScheduleOptionElem: function(e) {
        var t = $("<option>");
        return t.val(e.ScheduleID),
        t.text(e.ScheduleName),
        t.data("period-id", e.PeriodID),
        t.data("uses-binding", e.UsesBinding),
        t
    },
    fetchSchedules: function(r) {
        var o = FrontpageSchedule
          , e = {};
        r && o.elements.wtSelSchedule.off("change.worktime"),
        o.elements.wtSelSchedule.children().not(":first").remove(),
        e.date = o.selectedDay + "." + o.selectedMonth + "." + o.selectedYear,
        e.mode = o.mode,
        $.get(getRolePrefix() + "/schedule/fetchschedules", e, function(e) {
            var t, n, a = {};
            try {
                for (t = e.Schedules,
                "new" !== o.mode || r || (o.selectedKurreType = e.UserSettings.LastSelectedReservationCategoryType,
                o.selectedScheduleID = anyToNumber(e.UserSettings.LastSelectedScheduleID, 0)),
                n = 0; n < t.length; n++)
                    o.elements.wtSelSchedule.append(o.createScheduleOptionElem(t[n]));
                if (0 === o.selectedScheduleID && 1 === t.length)
                    o.elements.wtSelSchedule.val(o.elements.wtSelSchedule.find("option:eq(1)").val()),
                    o.elements.wtSelSchedule.change(),
                    "new" !== o.mode || r || o.elements.sidePanelReservation.show();
                else {
                    if (o.elements.wtSelSchedule.removeAttr("disabled"),
                    !o.selectOptionIfFound(o.elements.wtSelSchedule, o.selectedScheduleID))
                        return void o.showErrors([o.translations["schedule-not-found"]]);
                    0 < o.selectedScheduleID && (a.ScheduleID = o.selectedScheduleID,
                    a.ReservationID = o.selectedReservationID,
                    a.Mode = FrontpageSchedule.mode,
                    r || o.fetchReservationProperties(a))
                }
                1 === t.length ? o.elements.wtSelSchedule.attr("disabled", "disabled") : o.elements.wtSelSchedule.removeAttr("disabled"),
                0 < t.length ? (o.updateSidepanelDate(),
                "new" !== o.mode || r || o.elements.sidePanel.show()) : o.showErrors([o.translations["schedule-not-found"]]),
                "new" === o.mode ? o.elements.sidePanel.setTitle(o.translations["new-worktime"]) : o.elements.sidePanel.setTitle(o.translations["edit-worktime"]),
                r && o.elements.wtSelSchedule.on("change.worktime", o.handleScheduleSelectionChanged)
            } catch (e) {
                o.showErrors([e])
            }
        }).fail(function() {
            o.isFetchingEvents = !1,
            alert(o.translations["conn-fail"]),
            document.location.reload(!0)
        })
    },
    handleAddNewWorktimeLinkClicked: function(e) {
        var t = $(e.target);
        e.stopPropagation(),
        t.is("a") && e.preventDefault(),
        FrontpageSchedule.selectedReservationID = 0,
        FrontpageSchedule.mode = "new",
        FrontpageSchedule.fetchSchedules()
    },
    handleWorktimeCancelButtonClicked: function() {
        var e = FrontpageSchedule.elements.sidePanel;
        e.getElement().find(".form-problem").removeClass("form-problem"),
        e.hide()
    },
    selectOptionIfFound: function(e, t, n) {
        var a = !1;
        return e.find('option[value="' + t + '"]').length ? (e.val(t),
        a = !0) : void 0 !== n ? e.val(n) : e.val("0"),
        e.change(),
        a
    },
    toggleElementDisabled: function(e, t) {
        t ? (e.removeAttr("disabled"),
        (e.is("select") ? e.parent() : e).prev().removeClass("disabled")) : (e.attr("disabled", "disabled"),
        (e.is("select") ? e.parent() : e).prev().addClass("disabled"))
    },
    toggleReservationPropertyFields: function(e) {
        this.toggleElementDisabled(this.elements.wtActivityType, 0 <= $.inArray("ActivityType", e)),
        this.toggleElementDisabled(this.elements.wtCourseType, 0 <= $.inArray("CourseType", e)),
        this.toggleElementDisabled(this.elements.wtBinding, 0 <= $.inArray("Binding", e)),
        this.toggleElementDisabled(this.elements.wtLessonIdentifier, 0 <= $.inArray("LessonIdentifier", e)),
        this.toggleElementDisabled(this.elements.wtExtraInfo, 0 <= $.inArray("ExtraInfo", e))
    },
    disableSubfields: function() {
        FrontpageSchedule.elements.wtExtraInfo.attr("disabled", "disabled"),
        FrontpageSchedule.elements.wtLessonIdentifier.attr("disabled", "disabled"),
        FrontpageSchedule.elements.wtActivityType.attr("disabled", "disabled"),
        FrontpageSchedule.elements.wtCourseType.attr("disabled", "disabled"),
        FrontpageSchedule.elements.wtBinding.attr("disabled", "disabled")
    },
    toggleLowerSidepanelSelectFieldChangeEvents: function(e) {
        e ? (FrontpageSchedule.elements.wtCourseType.on("change.worktime", FrontpageSchedule.handleWorktimeSelectChanged),
        FrontpageSchedule.elements.wtActivityType.on("change.worktime", FrontpageSchedule.handleWorktimeSelectChanged),
        FrontpageSchedule.elements.wtBinding.on("change.worktime", FrontpageSchedule.handleWorktimeSelectChanged)) : (FrontpageSchedule.elements.wtCourseType.off("change.worktime"),
        FrontpageSchedule.elements.wtActivityType.off("change.worktime"),
        FrontpageSchedule.elements.wtBinding.off("change.worktime"))
    },
    fetchReservationProperties: function(s) {
        s && 0 !== s.ReservationID && 0 !== s.ScheduleID && (FrontpageSchedule.toggleLowerSidepanelSelectFieldChangeEvents(!1),
        $.get(getRolePrefix() + "/schedule/fetchreservationproperties", s, function(o) {
            try {
                if ($.isEmptyObject(o))
                    return void FrontpageSchedule.showInfo([FrontpageSchedule.translations.notfound]);
                s.KurreType = o.KurreType,
                s.ActivityType = o.ActivityType,
                s.CourseType = o.CourseType,
                FrontpageSchedule.selectedKurreType = o.KurreType,
                FrontpageSchedule.toggleReservationPropertyFields(o.PriviligesOwn),
                $.get(getRolePrefix() + "/schedule/fetchresourcetypes", s, function(e) {
                    var t, n, a, r = $("#wt-course-type-label");
                    try {
                        for (FrontpageSchedule.elements.wtActivityType.children().not(":first").remove(),
                        t = 0; t < e.ActivityTypes.length; t++)
                            n = e.ActivityTypes[t],
                            (a = $("<option>")).text(n.Caption),
                            a.val(n.ID),
                            n.Allowed || a.addClass("text-error"),
                            FrontpageSchedule.elements.wtActivityType.append(a);
                        for (FrontpageSchedule.elements.wtCourseType.children().not(":first").remove(),
                        t = 0; t < e.CourseTypes.length; t++)
                            n = e.CourseTypes[t],
                            (a = $("<option>")).text(n.Caption),
                            a.val(n.ID),
                            n.Allowed || a.addClass("text-error"),
                            FrontpageSchedule.elements.wtCourseType.append(a);
                        FrontpageSchedule.elements.sidePanelReservation.hide(),
                        "teaching" === o.KurreType ? r.text(FrontpageSchedule.translations.coursetype) : r.text(FrontpageSchedule.translations.tasktype),
                        "edit" === FrontpageSchedule.mode ? (0 <= $.inArray("AddMoveRemove", o.PriviligesOwn) ? FrontpageSchedule.elements.wtBtnRemoveWorktime.removeClass("hidden") : FrontpageSchedule.elements.wtBtnRemoveWorktime.addClass("hidden"),
                        0 < o.PriviligesOwn.length ? FrontpageSchedule.elements.wtBtnSaveWorktime.removeClass("hidden") : FrontpageSchedule.elements.wtBtnSaveWorktime.addClass("hidden"),
                        FrontpageSchedule.elements.wtStartTime.val(o.StartTime).attr("disabled", "disabled"),
                        FrontpageSchedule.elements.wtEndTime.val(o.EndTime).attr("disabled", "disabled"),
                        FrontpageSchedule.elements.wtDatePicker.val(FrontpageSchedule.getSelectedDateFinnish()).attr("disabled", "disabled"),
                        FrontpageSchedule.elements.wtDatePicker.siblings(".datepick-trigger").attr("disabled", "disabled")) : (FrontpageSchedule.elements.wtBtnRemoveWorktime.addClass("hidden"),
                        FrontpageSchedule.elements.wtStartTime.removeAttr("disabled", "disabled"),
                        FrontpageSchedule.elements.wtEndTime.removeAttr("disabled", "disabled"),
                        FrontpageSchedule.elements.wtDatePicker.removeAttr("disabled", "disabled").siblings(".datepick-trigger").removeAttr("disabled", "disabled")),
                        FrontpageSchedule.selectOptionIfFound(FrontpageSchedule.elements.wtCourseType, o.CourseType),
                        FrontpageSchedule.selectOptionIfFound(FrontpageSchedule.elements.wtActivityType, o.ActivityType),
                        FrontpageSchedule.selectOptionIfFound(FrontpageSchedule.elements.wtBinding, o.Binding, "1"),
                        0 < o.LessonIdentifier.length ? (FrontpageSchedule.elements.wtLessonIdentifier.val(o.LessonIdentifier),
                        FrontpageSchedule.lessonIdentifierFromKurre = o.LessonIdentifier) : FrontpageSchedule.lessonIdentifierFromKurre = "",
                        0 < o.ExtraInfo.length ? (FrontpageSchedule.elements.wtExtraInfo.val(o.ExtraInfo),
                        FrontpageSchedule.extraInfoFromKurre = o.ExtraInfo) : FrontpageSchedule.extraInfoFromKurre = "",
                        FrontpageSchedule.addRemoveErrorSelectErrorIcon(FrontpageSchedule.elements.wtActivityType),
                        FrontpageSchedule.addRemoveErrorSelectErrorIcon(FrontpageSchedule.elements.wtCourseType),
                        FrontpageSchedule.toggleBindingContainer(o.WorkTime),
                        o.ScheduleID = FrontpageSchedule.selectedScheduleID,
                        o.ReservationID = FrontpageSchedule.getSelectedReservationID(),
                        "edit" === FrontpageSchedule.mode ? o.HoursCaption = "" : o.HoursCaption = s.HoursCaption,
                        FrontpageSchedule.fetchAndBuildReservationBlock(o)
                    } catch (e) {
                        FrontpageSchedule.showErrors([e])
                    }
                }).fail(function() {
                    alert(FrontpageSchedule.translations["conn-fail"]),
                    document.location.reload(!0)
                })
            } catch (e) {
                FrontpageSchedule.showErrors([e])
            }
        }).fail(function() {
            alert(FrontpageSchedule.translations["conn-fail"]),
            document.location.reload(!0)
        }))
    },
    handlewtReservationListClicked: function(e) {
        var t = $(e.target)
          , n = {}
          , e = t.is("a") ? (e.preventDefault(),
        t) : t.closest("a")
          , t = e.clone();
        t.click(FrontpageSchedule.handleSelectedReservationClicked),
        FrontpageSchedule.elements.wtSelectedReservation.children().remove(),
        FrontpageSchedule.elements.wtSelectedReservation.removeAttr("orig-worktime"),
        FrontpageSchedule.elements.wtSelectedReservation.append(t),
        n.HoursCaption = e.attr("data-hourscaption"),
        n.ReservationID = e.attr("data-reservation-id"),
        n.ScheduleID = FrontpageSchedule.elements.wtSelSchedule.find("option:selected").val(),
        n.Mode = FrontpageSchedule.mode,
        FrontpageSchedule.fetchReservationProperties(n)
    },
    handleReservationSearchBtnClicked: function(e) {
        $(e.target || e.srcElement).is("a") && e.preventDefault(),
        FrontpageSchedule.filterReservations()
    },
    handleSearchReservationFieldChanged: function() {
        FrontpageSchedule.filterReservations()
    },
    filterReservations: function() {
        var t = FrontpageSchedule.elements.wtSearchReservation.val().toLocaleLowerCase()
          , e = FrontpageSchedule.elements.wtReservationList
          , n = 0;
        e.find("a").removeClass("hidden").each(function() {
            var e = $(this);
            e.find('[name="caption"]').text().toLocaleLowerCase().indexOf(t) < 0 ? e.addClass("hidden") : n += 1
        }),
        0 === n ? (FrontpageSchedule.elements.wtNoReservationsInfobox.removeClass("hidden"),
        FrontpageSchedule.elements.wtReservationList.addClass("hidden")) : (FrontpageSchedule.elements.wtNoReservationsInfobox.addClass("hidden"),
        FrontpageSchedule.elements.wtReservationList.removeClass("hidden"))
    },
    threeDotsIfNeeded: function(e, t) {
        return e.length > t ? e.substr(0, t) + "..." : e
    },
    bindingToCaption: function(e) {
        return 1 === e ? FrontpageSchedule.translations.bound : 2 === e ? FrontpageSchedule.translations.unbound : 4 === e ? FrontpageSchedule.translations.unregulated : ""
    },
    createReservationBlock: function(e, t) {
        var n, a, r = $("<a>").attr("href", "#").addClass("list-group-item longwords bigger-text").attr("data-reservation-id", e.ID).attr("data-kurretype", e.KurreType).attr("data-classes", e.Classes).attr("data-hourscaption", e.HoursCaption).attr("data-caption", e.Caption), o = FrontpageSchedule.maxReservationCaptionLength, s = FrontpageSchedule.threeDotsIfNeeded(e.Caption, o), l = $("<span>").addClass("list-group-item-text").text(s).attr("name", "caption");
        return r.append(l),
        "" !== e.Classes ? (s = "",
        e.Caption.length > o && (s = e.Caption),
        e.Classes.length > o && (s = s + " (" + e.Classes + ")"),
        s.length && r.attr("title", s),
        e.Classes = FrontpageSchedule.threeDotsIfNeeded(e.Classes.replace(/\//g, "/ ")),
        s = $("<span>").addClass("sub-text").text(" (" + e.Classes + ")").attr("name", "classes"),
        l.append(s)) : e.Caption.length > o && r.attr("title", e.Caption),
        e.WorkTime.length && (r.append("<br/>"),
        o = e.WorkTime,
        0 < e.Binding && (o += " - " + FrontpageSchedule.bindingToCaption(e.Binding)),
        e.BindingHoursCaption.length && (o += " (" + e.BindingHoursCaption + ")"),
        t || ((n = FrontpageSchedule.elements.wtSelectedReservation).attr("orig-worktime") || n.attr("orig-worktime", o)),
        a = $("<p>").addClass("list-group-item-text list-group-item-subtext").text(o),
        t && "reservation" === e.KurreType || !t && "new" === FrontpageSchedule.mode && "reservation" === e.KurreType || !t && n && n.attr("orig-worktime") !== o ? FrontpageSchedule.hoursToNumber(e.BindingHoursCaption) <= 0 ? a.addClass("no-hours-left") : a.addClass("hours-left") : a.addClass("hours-earmarked"),
        r.append(a)),
        "" !== e.HoursCaption && (a = $("<span>").addClass("semi-bold").text(e.HoursCaption).attr("name", "hours"),
        (e = $("<p>").addClass("list-group-item-text list-group-item-subtext").text(FrontpageSchedule.translations.hours + ": ")).append(a),
        r.append(e)),
        r
    },
    updateReservationsList: function(e, t, n) {
        var a, r, o = e.parent(), s = $("#wt-search-group"), l = FrontpageSchedule.elements.wtNoReservationsInfobox;
        for (FrontpageSchedule.elements.wtReservationList.removeClass("hidden"),
        e.children().remove(),
        0 === t.length ? ("0" !== n ? l.removeClass("hidden") : l.addClass("hidden"),
        o.addClass("hidden"),
        s.addClass("hidden")) : (l.addClass("hidden"),
        o.removeClass("hidden"),
        s.removeClass("hidden")),
        a = 0; a < t.length && (void 0 === t[a].HoursCaption || "" === t[a].HoursCaption); a++)
            ;
        for (a = 0; a < t.length; a++)
            r = t[a],
            e.append(FrontpageSchedule.createReservationBlock(r, !0));
        e.find("a").click(FrontpageSchedule.handlewtReservationListClicked),
        FrontpageSchedule.elements.wtSearchReservation.val().length && FrontpageSchedule.filterReservations()
    },
    handleReservationCategoryChanged: function() {
        var e = FrontpageSchedule
          , t = []
          , n = e.elements.wtReservationList
          , a = e.elements.wtReservationCategory.val();
        "lesson" === a ? t = e.availableReservations.Lessons : "no-period" === a ? t = e.availableReservations.NoPeriod : "reservation" === a && (t = e.availableReservations.Reservations),
        e.updateReservationsList(n, t, a)
    },
    toggleReservationFields: function(e) {
        var t = $("#wt-fields-container");
        e ? (t.removeClass("hidden"),
        FrontpageSchedule.elements.wtBtnSaveWorktime.removeAttr("disabled").removeClass("disabled")) : (t.addClass("hidden"),
        FrontpageSchedule.elements.wtBtnSaveWorktime.attr("disabled", "disabled").addClass("disabled"))
    },
    handleScheduleSelectionChanged: function() {
        var t = FrontpageSchedule
          , e = {};
        e.scheduleID = anyToNumber(t.elements.wtSelSchedule.val(), 0),
        e.periodID = anyToNumber(t.elements.wtSelSchedule.find("option:selected").data("period-id"), 0),
        t.toggleLowerSidepanelSelectFieldChangeEvents(!1),
        t.elements.wtReservationCategory.val("0").change(),
        t.clearSidepanelFields("all"),
        t.updateSidepanelDate(),
        e.periodID <= 0 ? t.toggleReservationFields(!1) : (t.selectedScheduleID = e.scheduleID,
        t.toggleReservationFields(!0),
        t.toggleBindingContainer(!0),
        t.disableSubfields(),
        $.get(getRolePrefix() + "/schedule/fetchreservations", e, function(e) {
            try {
                t.availableReservations = e,
                "new" === t.mode && (FrontpageSchedule.selectOptionIfFound(FrontpageSchedule.elements.wtReservationCategory, FrontpageSchedule.selectedKurreType, "0"),
                2 === FrontpageSchedule.elements.wtSelSchedule.children().length && FrontpageSchedule.elements.sidePanelReservation.show())
            } catch (e) {
                FrontpageSchedule.showErrors([e])
            }
        }).fail(function() {
            alert(FrontpageSchedule.translations["conn-fail"]),
            document.location.reload(!0)
        }))
    },
    addRemoveErrorSelectErrorIcon: function(e) {
        var t;
        e.find("option:selected").hasClass("text-error") ? (e.attr("title", FrontpageSchedule.translations["not-allowed"]),
        0 === e.next().children().length && (t = $('<span class="vismaicon vismaicon-sm vismaicon-filled vismaicon-error pull-right ff-select-icon-fix"></span>'),
        e.next().append(t))) : (e.removeAttr("title"),
        e.next().children().first().remove())
    },
    handleCourseTypeChanged: function() {
        var e = $(this);
        FrontpageSchedule.addRemoveErrorSelectErrorIcon(e)
    },
    handleActivityTypeChanged: function() {
        var e = $(this);
        FrontpageSchedule.addRemoveErrorSelectErrorIcon(e)
    },
    toggleBindingContainer: function(e) {
        !0 === FrontpageSchedule.elements.wtSelSchedule.find("option:selected").data("uses-binding") && e ? FrontpageSchedule.elements.wtBindingContainer.removeClass("hidden") : FrontpageSchedule.elements.wtBindingContainer.addClass("hidden")
    },
    fetchAndBuildReservationBlock: function(t) {
        var e = {};
        e.Binding = t.Binding,
        e.ScheduleID = t.ScheduleID,
        e.CourseTypeID = t.CourseType,
        e.ActivityTypeID = t.ActivityType,
        $.get(getRolePrefix() + "/schedule/fetchreservationworktimeproperties", e, function(e) {
            $.isEmptyObject(e) || (e.ID = t.ReservationID,
            e.KurreType = t.KurreType,
            e.Caption = t.Caption,
            e.Classes = t.Classes,
            e.HoursCaption = t.HoursCaption,
            FrontpageSchedule.toggleBindingContainer(e.WorkTime),
            e = FrontpageSchedule.createReservationBlock(e, !1),
            FrontpageSchedule.elements.wtSelectedReservation.empty(),
            FrontpageSchedule.elements.wtSelectedReservation.append(e),
            "new" === FrontpageSchedule.mode ? (e.click(FrontpageSchedule.handleSelectedReservationClicked),
            FrontpageSchedule.elements.wtSelSchedule.removeClass("disabled").removeAttr("disabled")) : (e.addClass("disabled"),
            FrontpageSchedule.elements.wtSelSchedule.addClass("disabled").attr("disabled", "disabled")),
            FrontpageSchedule.elements.wtReservationContainer.removeClass("hidden"),
            FrontpageSchedule.elements.sidePanel.show(),
            FrontpageSchedule.toggleLowerSidepanelSelectFieldChangeEvents(!0))
        })
    },
    handleWorktimeSelectChanged: function() {
        var e = {}
          , t = FrontpageSchedule.elements.wtSelectedReservation.find("a:eq(0)")
          , n = FrontpageSchedule.getSelectedReservationID();
        0 !== n && 0 !== FrontpageSchedule.selectedScheduleID && (e.ScheduleID = FrontpageSchedule.selectedScheduleID,
        e.CourseTypeID = FrontpageSchedule.elements.wtCourseType.val(),
        e.ActivityTypeID = FrontpageSchedule.elements.wtActivityType.val(),
        e.Binding = FrontpageSchedule.elements.wtBinding.val(),
        $.get(getRolePrefix() + "/schedule/fetchreservationworktimeproperties", e, function(e) {
            $.isEmptyObject(e) || (e.ID = n,
            e.KurreType = t.attr("data-kurretype"),
            e.Caption = t.attr("data-caption"),
            e.Classes = t.attr("data-classes"),
            e.HoursCaption = t.attr("data-hourscaption"),
            FrontpageSchedule.toggleBindingContainer(e.WorkTime),
            FrontpageSchedule.elements.wtSelectedReservation.empty(),
            e = FrontpageSchedule.createReservationBlock(e, !1),
            "new" === FrontpageSchedule.mode && (e.click(FrontpageSchedule.handleSelectedReservationClicked),
            FrontpageSchedule.elements.wtSelSchedule.removeClass("disabled").removeAttr("disabled")),
            FrontpageSchedule.elements.wtSelectedReservation.append(e).flash())
        }))
    },
    refloatDock: function() {
        var e = FrontpageSchedule.elements.wtSidepanel.find(".dock");
        e.length && e.get(0).dock.trigger()
    },
    handleSidepanelBeforeShow: function() {
        $(".dock-buttons-wrapper").removeClass("hidden")
    },
    handleSidepanelAfterShow: function() {
        FrontpageSchedule.refloatDock()
    },
    handleSidepanelBeforeHide: function() {
        $(".dock-buttons-wrapper").addClass("hidden")
    },
    handleSidePanelAfterHide: function() {
        FrontpageSchedule.selectedKurreType = "",
        FrontpageSchedule.selectedScheduleID = 0,
        FrontpageSchedule.selectedReservationID = 0,
        FrontpageSchedule.elements.wtBtnRemoveWorktime.addClass("hidden"),
        FrontpageSchedule.clearSidepanelFields(),
        FrontpageSchedule.toggleReservationFields(!1)
    },
    getSelectedDateFinnish: function() {
        return 0 < this.selectedDay + this.selectedMonth + this.selectedYear ? this.selectedDay + "." + this.selectedMonth + "." + this.selectedYear : formatDate("t", "dd.mm.yyyy")
    },
    showLines: function(e, t, n) {
        var a, r;
        for (t.children().remove(),
        a = 0; a < e.length; a++)
            r = $("<p>"),
            e[a].length ? r.text(e[a]) : r.text(String.fromCharCode(160)),
            t.append(r);
        n.modal({
            backdrop: !0,
            keyboard: !0,
            show: !0
        })
    },
    showErrors: function(e) {
        this.showLines(e, $("#wt-error-msg"), $("#wt-error-dialog"))
    },
    showInfo: function(e) {
        this.showLines(e, $("#wt-info-msg"), $("#wt-info-dialog"))
    },
    clearSidepanelFields: function(e) {
        var t = FrontpageSchedule.elements.sidePanel.getElement().find("select:gt(0)");
        FrontpageSchedule.elements.sidePanel.getElement().find('input[type="text"],textarea').val(""),
        FrontpageSchedule.elements.wtSearchReservation.val(""),
        t.each(function() {
            var e = $(this);
            e.attr("id") !== FrontpageSchedule.elements.wtBinding.attr("id") && e.children().not(":first").remove(),
            e.removeClass("disabled").removeAttr("disabled"),
            e.val("0"),
            e.change()
        }),
        "all" === e && (FrontpageSchedule.elements.wtSelectedReservation.children().remove(),
        FrontpageSchedule.elements.wtSelectedReservation.removeAttr("orig-worktime"),
        FrontpageSchedule.elements.wtSelectedReservation.append(FrontpageSchedule.elements.selectReservationDefaultElem.click(FrontpageSchedule.handleSelectedReservationClicked)))
    },
    getSelectedReservationID: function() {
        return "new" === FrontpageSchedule.mode ? anyToNumber(FrontpageSchedule.elements.wtSelectedReservation.find("[data-reservation-id]:eq(0)").data("reservation-id"), 0) : FrontpageSchedule.selectedReservationID
    },
    handleSaveWorktimeButtonClicked: function() {
        var e = getRolePrefix() + "/schedule/addoreditworktime"
          , t = {}
          , n = FrontpageSchedule.elements.wtSelSchedule.find("option:selected")
          , a = n.data("period-id")
          , r = FrontpageSchedule.getSelectedReservationID()
          , o = FrontpageSchedule.elements.wtStartTime.val()
          , s = FrontpageSchedule.elements.wtEndTime.val()
          , l = FrontpageSchedule.elements.wtDatePicker.val()
          , i = timeStringToMinutes(o)
          , d = timeStringToMinutes(s)
          , c = [];
        t.mode = FrontpageSchedule.mode,
        t.reservationID = r,
        FrontpageSchedule.elements.sidePanel.getElement().find(".form-problem").removeClass("form-problem"),
        a || (FrontpageSchedule.elements.wtSelSchedule.parent().parent().addClass("form-problem"),
        c.push(FrontpageSchedule.elements.wtSelSchedule.parent().prev().text() + " " + FrontpageSchedule.translations.required)),
        r || (FrontpageSchedule.elements.wtReservationContainer.addClass("form-problem"),
        c.push(FrontpageSchedule.translations["res-required"])),
        0 === o.length && (FrontpageSchedule.elements.wtStartTime.parent().addClass("form-problem"),
        c.push(FrontpageSchedule.elements.wtStartTime.prev().text() + " " + FrontpageSchedule.translations.required)),
        0 === s.length && (FrontpageSchedule.elements.wtEndTime.parent().addClass("form-problem"),
        c.push(FrontpageSchedule.elements.wtEndTime.prev().text() + " " + FrontpageSchedule.translations.required)),
        0 === l.length && (FrontpageSchedule.elements.wtDatePicker.parent().addClass("form-problem"),
        c.push(FrontpageSchedule.elements.wtDatePicker.parent().prev().text() + " " + FrontpageSchedule.translations.required)),
        0 < c.length ? FrontpageSchedule.showInfo(c) : (d <= i ? (FrontpageSchedule.elements.wtEndTime.parent().addClass("form-problem"),
        c.push(FrontpageSchedule.translations["invalid-endtime"])) : d - i < 5 && (FrontpageSchedule.elements.wtEndTime.parent().addClass("form-problem"),
        c.push(FrontpageSchedule.translations["too-short-reservation"])),
        0 < c.length ? FrontpageSchedule.showInfo(c) : (t.formkey = FrontpageSchedule.formkey,
        t.periodID = a,
        t.scheduleID = n.val(),
        t.reservationID = r,
        t.activityTypeID = FrontpageSchedule.elements.wtActivityType.val(),
        t.courseTypeID = FrontpageSchedule.elements.wtCourseType.val(),
        t.reservationMode = FrontpageSchedule.elements.sidePanel.getElement().find("li.active").children().first().data("res-type"),
        t.kurreType = FrontpageSchedule.selectedKurreType,
        t.startTime = o,
        t.endTime = s,
        t.selectedDate = FrontpageSchedule.elements.wtDatePicker.val(),
        t.lessonIdentifier = FrontpageSchedule.elements.wtLessonIdentifier.val(),
        t.extraInfo = encodeURIComponent(FrontpageSchedule.elements.wtExtraInfo.val()),
        t.binding = FrontpageSchedule.elements.wtBinding.val(),
        t.reservationCategory = FrontpageSchedule.elements.wtReservationCategory.val(),
        $.ajax({
            type: "POST",
            url: e,
            data: t,
            dataType: "json",
            success: function(e) {
                try {
                    e.success ? (FrontpageSchedule.elements.wtExtraInfo.val(""),
                    FrontpageSchedule.elements.wtLessonIdentifier.val(""),
                    FrontpageSchedule.handleOnChangeMonthYear(FrontpageSchedule.selectedYear, FrontpageSchedule.selectedMonth, function() {
                        FrontpageSchedule.changeDay(FrontpageSchedule.selectedDay, FrontpageSchedule.selectedMonth, FrontpageSchedule.selectedYear, !1)
                    }),
                    notificationsSave(e.message),
                    FrontpageSchedule.elements.sidePanel.hide()) : "string" == typeof e.message ? FrontpageSchedule.showErrors(e.message.split("\r\n")) : FrontpageSchedule.showErrors(e.errors)
                } catch (e) {
                    FrontpageSchedule.showErrors([e])
                }
            },
            error: function() {
                alert(FrontpageSchedule.translations["conn-fail"]),
                document.location.reload(!0)
            }
        })))
    },
    getDataLayer: function(e) {
        for (var t = 0; t < this.dataLayers.length; t++)
            if (this.dataLayers[t].name.toLowerCase() === e.toLowerCase())
                return this.dataLayers[t];
        return null
    },
    buildAppointmentsLink: function(e, t, n) {
        var a, r = FrontpageSchedule.role, n = e + "." + t + "." + n;
        "student" !== r && "guardian" !== r && FrontpageSchedule.addAppointments && (r = getRolePrefix() + "/messages/compose?appointments&date=" + n,
        0 < (n = $("#new-appt-add")).length ? n.attr("href", r) : (n = $("<a />").attr({
            href: r,
            id: "new-appt-add"
        }).addClass("icon-link show-text"),
        r = $("<span />").addClass("vismaicon vismaicon-appointments"),
        a = $("<span />").text(FrontpageSchedule.translations["new-event"]),
        n.append(r).append(a),
        a = $("<div />").addClass("margin-top").append(n)),
        FrontpageSchedule.elements.calendar.after(a))
    },
    fetchEvents: function(e, t, a) {
        var n = {}
          , r = getRolePrefix() + "/overview"
          , o = "1." + e + "." + t;
        n.date = o,
        n.getfullmonth = !0,
        n.formkey = $("input[name=formkey]").val(),
        FrontpageSchedule.isFetchingEvents = !0,
        $.ajax({
            type: "POST",
            url: r,
            data: n,
            dataType: "json",
            success: function(e) {
                FrontpageSchedule.isFetchingEvents = !1;
                try {
                    var t, n = [];
                    if (void 0 === DataLayer)
                        throw new Error("FrontpageSchedule: DataLayer class is undefined!");
                    void 0 === e.Schedule && (e.Schedule = []),
                    t = new DataLayer("Schedule",e.Schedule),
                    n.push(t),
                    void 0 !== e.Exams && (t = new DataLayer("Exams",e.Exams),
                    n.push(t)),
                    void 0 !== e.Appointments && (t = new DataLayer("Appointments",e.Appointments),
                    n.push(t)),
                    FrontpageSchedule.dataLayers = n,
                    FrontpageSchedule.role = e.Role,
                    FrontpageSchedule.addAppointments = e.AddAppt,
                    "function" == typeof a && a()
                } catch (e) {
                    alert(e.message)
                }
            },
            error: function() {
                FrontpageSchedule.isFetchingEvents = !1
            }
        })
    },
    changeDay: function(e, t, n, a) {
        var r;
        FrontpageSchedule.isFetchingEvents || (this.selectedDay = e,
        this.selectedMonth = t,
        this.selectedYear = n,
        void 0 === a && (a = !0),
        a && (r = setTimeout(function() {
            FrontpageSchedule.markEvents(),
            clearTimeout(r)
        }, 0)),
        this.buildSchedule(e, t, n),
        this.buildExtraExams(e, t, n),
        this.elements.schedule.flash(),
        this.buildEvents(e, t, n),
        this.elements.events.flash(),
        this.buildAppointmentsLink(e, t, n),
        this.fixColHeights())
    },
    fixColHeights: function() {
        var e = this.elements.schedule.parent()
          , t = this.elements.calendar.parent().outerHeight();
        768 < $(window).innerWidth() ? (e.css("height", ""),
        t > e.outerHeight() && e.css("height", t)) : e.css("height", "")
    },
    buildExtraExams: function(e, t, n) {
        var a, r = this.getDataLayer("Exams"), o = r ? r.getData() : [], s = [], r = this.elements.extraExams, l = !1;
        if (r.empty(),
        0 < o.length)
            for (a = 0; a < o.length; a++)
                !o[a].inScheduleBlock && this.strDateIsGivenDay(o[a].Date.split(".").reverse().join("-"), e, t, n) ? s.push(o[a]) : o[a].inScheduleBlock && this.strDateIsGivenDay(o[a].Date.split(".").reverse().join("-"), e, t, n) && (l = !0);
        0 < s.length ? (r.addClass("margin-bottom align-right"),
        r.append($("<div />").addClass("divider")),
        r.append(this.createExamBadge(s, (l ? this.translations["other-exams"] : this.translations.exams) + ": " + s.length, !0))) : r.removeClass("margin-bottom")
    },
    getApptTimeObject: function(e) {
        var t = {}
          , n = e.Start.split(" ")
          , a = n[0].split("-");
        return t.startDate = a[2] + "." + a[1] + ".",
        t.startTime = 1 < n.length ? n[1] : "",
        a = (n = e.End.split(" "))[0].split("-"),
        t.endDate = a[2] + "." + a[1] + ".",
        t.endTime = 1 < n.length ? n[1] : "",
        t.startDate === t.endDate ? t.apptHeadline = t.startTime + " - " + t.endTime : t.apptHeadline = t.startDate + " " + t.startTime + " - " + t.endDate + " " + t.endTime,
        t
    },
    buildEvents: function(e, t, n) {
        var a, r, o, s, l, i, d, c, h, u, p, g = this.getDataLayer("Appointments"), m = this.elements.events, v = "", S = "", f = "", w = [], F = [];
        if (m.empty(),
        null !== g) {
            for (o = g.getData(),
            a = 0; a < o.length; a++)
                o[a].Type = "Appointment";
            w = w.concat(o)
        }
        for (a = 0; a < w.length; a++)
            l = e + "-" + t + "-" + n,
            i = this.reverseStrDate(w[a].Start.split(" ")[0]),
            d = this.reverseStrDate(w[a].End.split(" ")[0]),
            dateIsBetween(l, i, d) && F.push(w[a]);
        if (F = F.sort(function(e, t) {
            return new Date(e.Start).valueOf() - new Date(t.Start).valueOf()
        }),
        l = this.getDateLabel(e, t, n),
        0 < F.length) {
            for (m.addClass("margin-top"),
            u = getRolePrefix() + "/messages/appointments",
            $("<h2 />").addClass("no-top-margin").append($("<a />").addClass("text-style-link").text(this.translations.events + l).attr("href", u)).appendTo(m),
            a = 0; a < F.length; a++)
                if (s = F[a],
                h = "Appointment" === s.Type,
                f = "",
                S = "",
                v = "",
                h && "" !== (p = this.getApptTimeObject(s)).startTime && "" !== p.endTime) {
                    if (u = getRolePrefix() + "/messages/" + s.MsgID,
                    c = $("<div />"),
                    0 < a && m.append($("<div />").addClass("divider")),
                    $("<strong />").text(p.apptHeadline).appendTo(c),
                    $("<p />").addClass("no-bottom-margin").append($("<a />").addClass("secondary-link").text(s.Subject).attr("href", u)).appendTo(c),
                    $("<p />").addClass("sub-text").text(s.Info).appendTo(c),
                    void 0 !== s.Sender)
                        f = s.Sender,
                        S = this.translations.sender,
                        v = "vismaicon-user";
                    else if (void 0 !== s.PeopleCount && ("teacher" === this.role || "personnel" === this.role)) {
                        if (void 0 === s.Ilmoittautuneet)
                            f = s.MustApply ? this.translations.participants : this.translations.invitation,
                            f += ": " + s.PeopleCount;
                        else
                            for (r in s.Ilmoittautuneet)
                                s.Ilmoittautuneet.hasOwnProperty(r) && (f += r + " " + s.Ilmoittautuneet[r].toString());
                        v = "vismaicon-users"
                    }
                    "" !== f && (h = $("<p />").text(" " + f),
                    "" !== v && $("<span />").addClass("vismaicon vismaicon-sm " + v).prependTo(h),
                    "" !== S && h.attr("title", S),
                    c.append(h)),
                    m.append(c)
                }
        } else
            m.removeClass("margin-top")
    },
    buildSchedule: function(e, t, n) {
        var a, r, o, s, l, i, d, c, h, u, p, g, m, v, S, f, w, F, y, C, k, D = this.getDataLayer("Schedule").getData(), b = this.getDataLayer("Exams"), T = [], x = [], I = this.elements.schedule, R = this.role;
        if (!FrontpageSchedule.isFetchingEvents) {
            for (I.empty(),
            null !== b && (x = b.getData()),
            D = this.sortDataArray(D),
            r = 0; r < D.length; r++)
                for (f = D[r],
                o = 0; o < f.DateArray.length; o++)
                    if (this.strDateIsGivenDay(f.DateArray[o], e, t, n)) {
                        T.push(f);
                        break
                    }
            if (u = this.getDateLabel(e, t, n),
            b = getRolePrefix() + "/schedule?date=" + e + "." + t + "." + n,
            $("<h2 />").addClass("no-top-margin").append($("<a />").addClass("text-style-link").text(this.translations.schedule + u).attr("href", b)).appendTo(I),
            0 < T.length) {
                for (r = 0; r < T.length; r++)
                    if (0 < (f = T[r]).Groups.length) {
                        for (m = e + "." + t + "." + n,
                        (c = $('<div class="reservation-event"/>').css("margin-bottom", 5)).attr("data-schedule-id", f.ScheduleID),
                        c.attr("data-reservation-id", f.ReservationID),
                        c.toggleClass("wt-allow-edit", f.AllowEdit),
                        c.toggleClass("wt-allow-add-move-remove", f.AllowAddMoveRemove),
                        0 < r && I.append($("<div />").addClass("divider")),
                        o = 0; o < f.Groups.length; o++) {
                            if (v = void 0 !== (S = f.Groups[o]).FullCaption && void 0 === S.Id && void 0 === S.CourseId,
                            a = [],
                            (y = w = "") !== f.Start && "" !== f.End) {
                                if (0 < x.length && !v)
                                    for (s = 0; s < x.length; s++)
                                        x[s].Date === m && this.timeBetween(x[s].TimeStart, f.Start, f.End) && x[s].Id === S.Id && (x[s].inScheduleBlock = !0,
                                        a.push(x[s]));
                                0 === o && (C = $("<strong />").text(f.Start + " - " + f.End),
                                h = $("<div />").append(C).appendTo(c))
                            }
                            if (void 0 !== S.FullCaption && (w = S.FullCaption),
                            F = S.Caption,
                            "teacher" === R && void 0 !== S.Class && "" !== S.Class && (y = " (" + S.Class.split("/").join("/ ") + ")"),
                            C = $("<div />").appendTo(c),
                            (0 < S.Id ? $("<a />").attr({
                                href: getRolePrefix() + "/groups/" + S.Id,
                                title: w
                            }).addClass("secondary-link") : $("<span />").attr({
                                title: w
                            })).text(F).append($("<span />").addClass("sub-text").text(y)).appendTo(C),
                            void 0 !== S.Rooms) {
                                for (g = $("<p/>"),
                                s = 0; s < S.Rooms.length; s++)
                                    if ((p = 0 < (k = S.Rooms[s]).Id ? $("<a />").addClass("profile-link").attr({
                                        href: getRolePrefix() + "/profiles/rooms/" + k.Id + "/schedule?date=" + m
                                    }) : $("<span />")).attr({
                                        title: k.LongCaption
                                    }).text(k.Caption),
                                    g.append(p),
                                    s < S.Rooms.length - 1) {
                                        if (this.checkIfTooManyResources(g, s + 1, S.Rooms.length, 10))
                                            break;
                                        g.append(", ")
                                    }
                                g.appendTo(C)
                            }
                            y = $("<div />").addClass("action-wrapper horizontal-link-container pull-right"),
                            "student" !== R && "guardian" !== R && void 0 !== S.ShowActions && (S.ShowActions.Attendance && $("<a />").attr({
                                href: getRolePrefix() + "/groups/" + S.Id + "/attendance_edit?date=" + m,
                                title: this.translations.notes
                            }).append($("<span />").addClass("vismaicon vismaicon-sm vismaicon-attendances")).appendTo(y),
                            S.ShowActions.Diary && $("<a />").attr({
                                href: getRolePrefix() + "/groups/" + S.Id + "/diary?date=" + m + "&start=" + f.Start + "&end=" + f.End,
                                title: this.translations.diary
                            }).append($("<span />").addClass("vismaicon vismaicon-sm vismaicon-diary")).appendTo(y),
                            S.ShowActions.Grading && $("<a />").attr({
                                href: getRolePrefix() + "/grading/edit/" + S.Id,
                                title: this.translations.grading
                            }).append($("<span />").addClass("vismaicon vismaicon-sm vismaicon-grading")).appendTo(y)),
                            0 < a.length && y.prepend(this.createExamBadge(a, this.translations.exam)),
                            1 === f.Groups.length ? y.appendTo(h) : (C.wrap($("<div />").addClass("clearfix")),
                            C.addClass("pull-left"),
                            C.after(y))
                        }
                        I.append(c)
                    }
            } else
                $("<div />").addClass("margin-top-bottom align-center secondary-text").text(this.translations["no-schedule"]).appendTo(I);
            isTeacher && allowWorktime && ((b = {}).Date = e + "." + t + "." + n,
            b.Mode = "new",
            $.get(getRolePrefix() + "/schedule/fetchschedules", b, function(e) {
                try {
                    0 < e.Schedules.length && (l = $('<a href="#" class="icon-link">').attr("title", FrontpageSchedule.translations["new-worktime"]),
                    i = $('<span class="vismaicon vismaicon-add-circle">'),
                    d = $("<span>").text(FrontpageSchedule.translations["new-worktime"]),
                    l.append(i),
                    l.append(d),
                    FrontpageSchedule.elements.schedule.find(".add-link-wrapper").remove(),
                    (c = $("<div />").addClass("margin-top align-right add-link-wrapper")).append(l),
                    c.appendTo(FrontpageSchedule.elements.schedule),
                    FrontpageSchedule.bindEditAndAddWorktimeLinkEvents(),
                    setTimeout(function() {
                        FrontpageSchedule.fixColHeights()
                    }, 0))
                } catch (e) {
                    FrontpageSchedule.showErrors([e])
                }
            }),
            this.elements.schedule.find("div.reservation-event.wt-allow-edit,div.reservation-event.wt-allow-add-move-remove").each(function() {
                var e = $(this).find("div.action-wrapper");
                1 === e.length && e.append('<a href="#" class="wt-edit-link pull-right"><span class="vismaicon vismaicon-sm vismaicon-edit"></span></a>')
            }))
        }
    },
    checkIfTooManyResources: function(e, t, n, a) {
        return t === a && a + 1 < n && (e.append(FrontpageSchedule.translations["too-many-resources"].replace("%s", (n - t).toString())),
        !0)
    },
    bindEditAndAddWorktimeLinkEvents: function() {
        FrontpageSchedule.elements && FrontpageSchedule.elements.schedule && ($("div.add-link-wrapper").find("a,span").off("click").click(FrontpageSchedule.handleAddNewWorktimeLinkClicked),
        FrontpageSchedule.elements.schedule.find(".wt-edit-link").off("click").click(FrontpageSchedule.handleEditWorktimeLinkClicked))
    },
    createExamBadge: function(e, t, n) {
        t = $("<span />").addClass("badge has-popover").attr({
            "data-exams": JSON.stringify(e)
        }).text(t).css({
            cursor: "pointer"
        });
        return n && t.addClass("badge-lg"),
        t.popover({
            html: !0,
            trigger: "click",
            placement: "auto",
            content: function() {
                var e = $(this).data("exams") || [];
                return FrontpageSchedule.getExamPopoverContentElm(e)
            }
        }),
        t
    },
    getExamPopoverContentElm: function(e) {
        for (var t, n, a, r, o, s, l = this.role, i = $("<div />"), d = 0; d < e.length; d++)
            a = e[d],
            r = "",
            t = !1,
            n = $("<div />"),
            a.TimeStart && a.TimeEnd && (o = a.TimeStart,
            s = a.TimeEnd,
            -1 < o.indexOf(".") && (o = o.split(".").join(":")),
            -1 < s.indexOf(".") && (s = s.split(".").join(":")),
            $("<div />").append($("<strong />").text(o + " - " + s)).appendTo(n)),
            d < e.length - 1 && n.addClass("margin-bottom"),
            0 < d && $("<div />").addClass("divider").appendTo(i),
            a.Name ? r = a.Name : (a.Course && (r = a.Course),
            a.CourseTitle && ("" !== r && (r += " "),
            r += a.CourseTitle)),
            "" === r ? r = this.translations.exam : t = !0,
            0 < a.Id && (s = getRolePrefix() + "/groups/",
            a.ExamId && "teacher" === l ? s += "modifyexam/" + a.Id + "/" + a.ExamId : s += a.Id + "/exams",
            t && $("<a />").attr("href", s).text(r).appendTo(n)),
            0 === n.children("a").length && n.append($("<span />").text(r)),
            a.Info && $("<p />").addClass("exam-popover-info-text").text($.trim(a.Info)).appendTo(n),
            i.append(n);
        return i
    },
    strDateIsGivenDay: function(e, t, n, a) {
        var r = e.split("-")
          , o = parseInt(r[0], 10)
          , e = parseInt(r[1], 10);
        return parseInt(r[2], 10) === t && e === n && o === a
    },
    timeBetween: function(e, t, n) {
        var a, r = new Date, o = new Date, s = new Date;
        return void 0 !== e && void 0 !== t && void 0 !== n && (a = -1 < e.indexOf(":") ? ":" : ".",
        e = e.split(a),
        r.setHours(e[0]),
        r.setMinutes(e[1]),
        a = -1 < t.indexOf(":") ? ":" : ".",
        e = t.split(a),
        o.setHours(e[0]),
        o.setMinutes(e[1]),
        a = -1 < n.indexOf(":") ? ":" : ".",
        e = n.split(a),
        s.setHours(e[0]),
        s.setMinutes(e[1]),
        (r = r.getTime()) >= o.getTime() && r <= s.getTime())
    },
    getDateLabel: function(e, t, n) {
        var a = new Date
          , r = new Date(a.getTime() + 864e5)
          , o = new Date(a.getTime() - 864e5);
        return a.getFullYear() === n && a.getMonth() + 1 === t && a.getDate() === e ? this.translations.today : r.getFullYear() === n && r.getMonth() + 1 === t && r.getDate() === e ? this.translations.tomorrow : o.getFullYear() === n && o.getMonth() + 1 === t && o.getDate() === e ? this.translations.yesterday : e + "." + t + "."
    },
    sortDataArray: function(e) {
        function t(e, t) {
            var n = new Date("1970/01/01 " + e.Start) - new Date("1970/01/01 " + t.Start);
            return 0 != n ? n : new Date("1970/01/01 " + e.End) - new Date("1970/01/01 " + t.End)
        }
        for (var n, a, r = [], o = {}, s = 0; s < e.length; s++)
            n = e[s],
            o.hasOwnProperty(n.Day) || (o[n.Day] = []),
            o[n.Day].push(n);
        for (a in o)
            o.hasOwnProperty(a) && (o[a].sort(t),
            r = r.concat(o[a]));
        return r
    },
    handleOnChangeMonthYear: function(e, t, n) {
        n = n || null,
        this.skipChangeMonthYear || (this.skipChangeMonthYear = !0,
        this.month = t,
        this.year = e,
        this.hasEventsCache = [],
        this.fetchEvents(t, e, function(e) {
            setTimeout(function() {
                FrontpageSchedule.changeDay(FrontpageSchedule.selectedDay, FrontpageSchedule.selectedMonth, FrontpageSchedule.selectedYear, !0)
            }, 0),
            FrontpageSchedule.skipChangeMonthYear = !1,
            "function" == typeof n && n(e)
        }))
    },
    markEvents: function() {
        var i, d, e = this.getDataLayer("Appointments"), t = this.getDataLayer("Exams"), n = this.getDataLayer("Schedule"), c = e ? e.getData() : [], h = t ? t.getData() : [], u = n ? n.getData() : [], p = this;
        this.elements.calendar.find("table.vismaDatePickerCalendar > tbody > tr > td").addClass("no-events").each(function() {
            var e, t, n, a, r, o = $(this), s = o.children("a").first(), l = [];
            if (s.attr("class") && (l = s.attr("class").split(" ")),
            0 < l.length) {
                for (n = 0; n < l.length; n++)
                    if (0 === l[n].indexOf("dp")) {
                        t = parseInt(l[n].substr(2), 10),
                        e = new Date(t);
                        break
                    }
                if (e) {
                    if (-1 < FrontpageSchedule.hasEventsCache.indexOf(t))
                        return FrontpageSchedule.hasEventsCache[t].hasEvents && o.addClass("has-events"),
                        void o.removeClass("no-events");
                    for (n = 0; n < h.length; n++)
                        if (r = h[n].Date.split("."),
                        e.getDate() === parseInt(r[0], 10) && e.getMonth() + 1 === parseInt(r[1], 10) && e.getFullYear() === parseInt(r[2], 10))
                            return o.removeClass("no-events"),
                            o.addClass("has-events"),
                            void (FrontpageSchedule.hasEventsCache[t] = {
                                hasEvents: !0
                            });
                    for (n = 0; n < c.length; n++)
                        if (i = p.reverseStrDate(c[n].Start.split(" ")[0]),
                        d = p.reverseStrDate(c[n].End.split(" ")[0]),
                        (r = []).push(e.getFullYear() + ""),
                        r.push(e.getMonth() + 1 + ""),
                        r.push(e.getDate() + ""),
                        r = r.reverse().join("-"),
                        dateIsBetween(r, i, d))
                            return o.removeClass("no-events"),
                            o.addClass("has-events"),
                            void (FrontpageSchedule.hasEventsCache[t] = {
                                hasEvents: !0
                            });
                    for (n = 0; n < u.length; n++)
                        for (a = 0; a < u[n].DateArray.length; a++)
                            if (r = u[n].DateArray[a].split("-"),
                            e.getDate() === parseInt(r[2], 10) && e.getMonth() + 1 === parseInt(r[1], 10) && e.getFullYear() === parseInt(r[0], 10))
                                return o.removeClass("no-events"),
                                void (FrontpageSchedule.hasEventsCache[t] = {
                                    hasEvents: !1
                                })
                }
            }
        })
    },
    reverseStrDate: function(e) {
        return e.split("-").reverse().join("-")
    },
    fixTimeString: function(e) {
        var t;
        return e = e.replace(".", ":"),
        /^[0-9][0-9]?:$/.test(e) && (e += "00"),
        /^[0-9][0-9]?$/.test(e) && (e += ":00"),
        2 === (t = e.split(":")).length && 1 === t[1].length ? 0 < (t = anyToNumber(t[1], 0)) && t < 6 && (e += "0") : /^\d{4}$/.test(e) && (e = e.substr(0, 2) + ":" + e.substr(2, 2)),
        1440 < timeStringToMinutes(e) && (e = "24:00"),
        e
    },
    handleOnPickDateChanged: function(e) {
        var t, n, a;
        0 < e.length && (t = e[0],
        n = t.getMonth() + 1,
        a = t.getFullYear(),
        FrontpageSchedule.month === n && FrontpageSchedule.year === a ? FrontpageSchedule.changeDay(t.getDate(), t.getMonth() + 1, t.getFullYear()) : FrontpageSchedule.handleOnChangeMonthYear(a, n, function() {
            FrontpageSchedule.changeDay(t.getDate(), n, a, !1)
        }))
    },
    initCalendarDatepicker: function() {
        var e;
        FrontpageSchedule.elements.calendar && ((e = window.datepickDefaults).onSelect = FrontpageSchedule.handleOnPickDateChanged,
        e.onChangeMonthYear = $.proxy(FrontpageSchedule.handleOnChangeMonthYear, FrontpageSchedule),
        FrontpageSchedule.elements.calendar.datepick(e))
    },
    initNativeTimeInputs: function(e) {
        e.each(function() {
            var e = $(this)
              , t = $('<input aria-hidden="true" type="time" style="width: 0; height: 0; z-index: -1; margin-top: -40px; position: relative">');
            e.after(t),
            e.focus(function() {
                t.focus()
            }),
            t.blur(function() {
                e.val(FrontpageSchedule.fixTimeString(t.val()))
            })
        })
    },
    init: function() {
        var e, t = new Date;
        $("body").css("overflow: hidden"),
        this.dataLayers = [],
        this.translations = this.getTranslations(),
        this.formkey = $("#wt-formkey").val(),
        this.elements.calendar = $("#frontpage-calendar"),
        this.elements.schedule = $("#frontpage-schedule"),
        this.elements.extraExams = $("#frontpage-extra-exams"),
        this.elements.events = $("#frontpage-events"),
        this.elements.wtSelSchedule = $("#wt-sel-schedule").on("change.worktime", FrontpageSchedule.handleScheduleSelectionChanged),
        this.elements.wtReservationCategory = $("#wt-reservation-category").change(FrontpageSchedule.handleReservationCategoryChanged),
        this.elements.wtBtnSaveWorktime = $("#wt-btn-saveworktime").click(FrontpageSchedule.handleSaveWorktimeButtonClicked),
        this.elements.wtStartTime = $("#wt-start-time"),
        this.elements.wtEndTime = $("#wt-end-time"),
        this.elements.wtConfirmRemoveDialog = $("#wt-confirm-remove-dialog"),
        this.elements.wtCourseType = $("#wt-course-type").change(FrontpageSchedule.handleCourseTypeChanged),
        this.elements.wtActivityType = $("#wt-activity-type").change(FrontpageSchedule.handleActivityTypeChanged),
        this.elements.wtBinding = $("#wt-binding"),
        this.elements.wtBindingContainer = $("#wt-binding-container"),
        this.elements.wtLessonIdentifier = $("#wt-lesson-identifier"),
        this.elements.wtExtraInfo = $("#wt-extrainfo"),
        this.elements.wtNoReservationsInfobox = $("#wt-no-reservations-infobox"),
        this.elements.wtReservationContainer = $("#wt-reservation-container"),
        this.elements.wtReservationList = $("#wt-reservation-list"),
        this.elements.wtSearchReservation = $("#wt-search-reservation").change(FrontpageSchedule.handleSearchReservationFieldChanged),
        this.elements.wtSelectedReservation = $("#wt-selected-reservation"),
        this.elements.wtSelectedReservation.find("a:eq(0)").click(FrontpageSchedule.handleSelectedReservationClicked),
        this.elements.wtSelScheduleContainer = $("#wt-sel-schedule-container"),
        this.elements.selectReservationDefaultElem = this.elements.wtSelectedReservation.find("a:eq(0)").clone(),
        this.elements.wtBtnRemoveWorktime = $("#wt-btn-removeworktime").click(FrontpageSchedule.handleRemoveWorktimeBtnClicked),
        this.elements.wtDatePicker = $("#wt-datepicker").change(FrontpageSchedule.handleDatePickerDateChanged),
        this.elements.wtSidepanel = $("#wt-sidepanel"),
        $("#wt-btn-cancel").click(FrontpageSchedule.handleWorktimeCancelButtonClicked),
        $("#wt-search-reservation").click(FrontpageSchedule.handleReservationSearchBtnClicked),
        $("#wt-btn-confirm-remove-worktime").click(FrontpageSchedule.handleConfirmRemoveWorktimeBtnClicked),
        $("#wt-btn-cancel-remove").click(FrontpageSchedule.handleCancelRemoveWorktimeBtnClicked),
        (e = $("input.time-input")).length && isiOS ? FrontpageSchedule.initNativeTimeInputs(e) : $("#wt-start-time, #wt-end-time").on("keypress", function(e) {
            return allowTimeInput($(this), e.charCode || e.which || e.keyCode)
        }).blur(function() {
            var e = $(this)
              , t = e.val();
            timeOK(t, [":", "."]) ? (t = FrontpageSchedule.fixTimeString(t),
            e.val(t)) : e.val("")
        }),
        this.elements.sidePanel = new SidePanel(this.elements.wtSidepanel,{
            modal: !0,
            onBeforeShow: FrontpageSchedule.handleSidepanelBeforeShow,
            onAfterShow: FrontpageSchedule.handleSidepanelAfterShow,
            onBeforeHide: FrontpageSchedule.handleSidepanelBeforeHide,
            onAfterHide: FrontpageSchedule.handleSidePanelAfterHide,
            unsavedChangesCheck: hasUnsavedChanges
        }),
        this.elements.sidePanelReservation = new SidePanel($("#wt-sidepanel-reservation"),{
            modal: !0,
            parentSidepanel: this.elements.sidePanel.getElement()
        }),
        this.month = t.getMonth() + 1,
        this.year = t.getFullYear(),
        this.initCalendarDatepicker(),
        $("a").first().focus(),
        $(window).on("resize", $.proxy(this.fixColHeights, this)),
        this.fetchEvents(t.getMonth() + 1, t.getFullYear(), function() {
            var e = new Date;
            FrontpageSchedule.changeDay(e.getDate(), e.getMonth() + 1, e.getFullYear()),
            FrontpageSchedule.buildAppointmentsLink(e.getDate(), e.getMonth() + 1, e.getFullYear()),
            FrontpageSchedule.fixColHeights()
        })
    }
};
$(function() {
    FrontpageSchedule.init()
}, 0);
var DataLayer = function(e, t) {
    var n = [];
    return this.name = e,
    "object" === _typeof(t) && Array.isArray(t) && (n = t),
    this.setData = function(e) {
        n = e
    }
    ,
    this.getData = function() {
        return n
    }
    ,
    this
};
function hasUnsavedChanges() {
    var e = FrontpageSchedule.elements.wtExtraInfo.val()
      , t = FrontpageSchedule.elements.wtLessonIdentifier.val()
      , n = FrontpageSchedule.extraInfoFromKurre
      , a = FrontpageSchedule.lessonIdentifierFromKurre;
    return e.length && e !== n || t.length && t !== a
}
