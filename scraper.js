var http = require("http");
var querystring = require("querystring");
var fs = require("fs");

var HUBS = [
  "US;California;3",
  "US;Georgia;9",
  "US;Illinois;7",
  "US;Colorado;6",
  "US;Florida;10",
  "US;Hawaii;5",
  "US;California;4",
  "US;New York;11",
  "US;Ohio;8",
  "US;California;16",
  "US;Pennsylvania;15",
  "US;Washington;2",
  "US;Washington, D.C.;1",
];
var FORM_URL = "http://www.teslamotors.com/models/preowned";
var AJAX_URL = "http://www.teslamotors.com/system/ajax";

var fetched = 0;
var dataFromAllHubs = [];

http.get(FORM_URL, function(res) {
  var data = "";
  res.on("data", function(chunk) {
    data += chunk.toString();
  });
  res.on("end", function() {
    var s = data.split("name=\"form_build_id\" value=\"");
    s = s[1].split("\"");
    fetchAllCars(s[0]);
  });
}).on("error", function(err) {
  console.log(err);
});;

function fetchAllCars(formKey) {
  HUBS.forEach(function(hub) {
    var postData = "BrowserType=Chrome&BrowserVersion=46&Os=Mac&detected_state=California&hub="+hub+"&battery=&paint=&form_build_id=" + formKey + "&form_id=tesla_cpo_marketing_filters_form&_triggering_element_name=hub&ajax_html_ids%5B%5D=viewport-tag&ajax_html_ids%5B%5D=fit-vids-style&ajax_html_ids%5B%5D=page-models-preowned&ajax_html_ids%5B%5D=page&ajax_html_ids%5B%5D=logo-link&ajax_html_ids%5B%5D=sub-nav&ajax_html_ids%5B%5D=main-nav&ajax_html_ids%5B%5D=hamburger&ajax_html_ids%5B%5D=system_messages&ajax_html_ids%5B%5D=tesla-cpo-marketing-filters-form&ajax_html_ids%5B%5D=BrowserType&ajax_html_ids%5B%5D=BrowserVersion&ajax_html_ids%5B%5D=Os&ajax_html_ids%5B%5D=detected_state&ajax_html_ids%5B%5D=edit-hub&ajax_html_ids%5B%5D=edit-battery&ajax_html_ids%5B%5D=edit-paint&ajax_html_ids%5B%5D=car-list&ajax_html_ids%5B%5D=user-login-form&ajax_html_ids%5B%5D=edit-name&ajax_html_ids%5B%5D=edit-pass&ajax_html_ids%5B%5D=edit-actions&ajax_html_ids%5B%5D=edit-submit--2&ajax_html_ids%5B%5D=locale-selector-d7&ajax_html_ids%5B%5D=locale-modal&ajax_html_ids%5B%5D=cboxOverlay&ajax_html_ids%5B%5D=colorbox&ajax_html_ids%5B%5D=cboxWrapper&ajax_html_ids%5B%5D=cboxTopLeft&ajax_html_ids%5B%5D=cboxTopCenter&ajax_html_ids%5B%5D=cboxTopRight&ajax_html_ids%5B%5D=cboxMiddleLeft&ajax_html_ids%5B%5D=cboxContent&ajax_html_ids%5B%5D=cboxTitle&ajax_html_ids%5B%5D=cboxCurrent&ajax_html_ids%5B%5D=cboxPrevious&ajax_html_ids%5B%5D=cboxNext&ajax_html_ids%5B%5D=cboxSlideshow&ajax_html_ids%5B%5D=cboxLoadingOverlay&ajax_html_ids%5B%5D=cboxLoadingGraphic&ajax_html_ids%5B%5D=cboxMiddleRight&ajax_html_ids%5B%5D=cboxBottomLeft&ajax_html_ids%5B%5D=cboxBottomCenter&ajax_html_ids%5B%5D=cboxBottomRight&ajax_page_state%5Btheme%5D=tesla_theme&ajax_page_state%5Btheme_token%5D=150ov9O3Ffcdlil5yquISegI40EeFyUJpdDjANEsBvo&ajax_page_state%5Bcss%5D%5Bsites%2Fall%2Fthemes%2Fcustom%2Ftesla_theme%2Fcss%2Fstyles.css%5D=1&ajax_page_state%5Bcss%5D%5Bmodules%2Fsystem%2Fsystem.base.css%5D=1&ajax_page_state%5Bcss%5D%5Bmodules%2Fsystem%2Fsystem.menus.css%5D=1&ajax_page_state%5Bcss%5D%5Bmodules%2Fsystem%2Fsystem.messages.css%5D=1&ajax_page_state%5Bcss%5D%5Bmodules%2Fsystem%2Fsystem.theme.css%5D=1&ajax_page_state%5Bcss%5D%5Bmodules%2Fcomment%2Fcomment.css%5D=1&ajax_page_state%5Bcss%5D%5Bsites%2Fall%2Fmodules%2Fcontrib%2Fdate%2Fdate_api%2Fdate.css%5D=1&ajax_page_state%5Bcss%5D%5Bsites%2Fall%2Fmodules%2Fcontrib%2Fdate%2Fdate_popup%2Fthemes%2Fdatepicker.1.7.css%5D=1&ajax_page_state%5Bcss%5D%5Bmodules%2Ffield%2Ftheme%2Ffield.css%5D=1&ajax_page_state%5Bcss%5D%5Bsites%2Fall%2Fmodules%2Fcontrib%2Ffitvids%2Ffitvids.css%5D=1&ajax_page_state%5Bcss%5D%5Bsites%2Fall%2Fmodules%2Fcontrib%2Flogintoboggan%2Flogintoboggan.css%5D=1&ajax_page_state%5Bcss%5D%5Bsites%2Fall%2Fmodules%2Fcontrib%2Fmollom%2Fmollom.css%5D=1&ajax_page_state%5Bcss%5D%5Bmodules%2Fnode%2Fnode.css%5D=1&ajax_page_state%5Bcss%5D%5Bsites%2Fall%2Fmodules%2Fcontrib%2Fpicture%2Fpicture_wysiwyg.css%5D=1&ajax_page_state%5Bcss%5D%5Bmodules%2Fsearch%2Fsearch.css%5D=1&ajax_page_state%5Bcss%5D%5Bmodules%2Fuser%2Fuser.css%5D=1&ajax_page_state%5Bcss%5D%5Bsites%2Fall%2Fmodules%2Fcontrib%2Fviews%2Fcss%2Fviews.css%5D=1&ajax_page_state%5Bcss%5D%5Bsites%2Fall%2Fmodules%2Fcontrib%2Fcolorbox%2Fstyles%2Fdefault%2Fcolorbox_style.css%5D=1&ajax_page_state%5Bcss%5D%5Bsites%2Fall%2Fmodules%2Fcontrib%2Fctools%2Fcss%2Fctools.css%5D=1&ajax_page_state%5Bcss%5D%5Bsites%2Fall%2Fmodules%2Fcontrib%2Fpanels%2Fcss%2Fpanels.css%5D=1&ajax_page_state%5Bcss%5D%5Bsites%2Fall%2Fthemes%2Fcustom%2Ftesla_theme%2Fplugins%2Flayouts%2Fdefault_template%2Fdefault_template.css%5D=1&ajax_page_state%5Bcss%5D%5Bsites%2Fall%2Fthemes%2Fcustom%2Ftesla_theme%2Fplugins%2Flayouts%2Ffooter_minipanel%2Ffooter_minipanel.css%5D=1&ajax_page_state%5Bcss%5D%5Bsites%2Fall%2Fthemes%2Fcustom%2Ftesla_theme%2Fplugins%2Flayouts%2Fheader_minipanel%2Fheader_minipanel.css%5D=1&ajax_page_state%5Bcss%5D%5Bsites%2Fall%2Fthemes%2Fcustom%2Ftesla_theme%2Fsystem.menus.css%5D=1&ajax_page_state%5Bcss%5D%5Bsites%2Fall%2Fthemes%2Fcustom%2Ftesla_theme%2Fsystem.theme.css%5D=1&ajax_page_state%5Bcss%5D%5Bsites%2Fall%2Fthemes%2Fcustom%2Ftesla_theme%2Fflexslider.css%5D=1&ajax_page_state%5Bcss%5D%5Bsites%2Fall%2Fthemes%2Fcustom%2Ftesla_theme%2Fflexslider_img.css%5D=1&ajax_page_state%5Bcss%5D%5Bsites%2Fall%2Fthemes%2Fcustom%2Ftesla_theme%2Ffield.css%5D=1&ajax_page_state%5Bcss%5D%5Bsites%2Fall%2Fthemes%2Fcustom%2Ftesla_theme%2Fcss%2Fmodels%2Fpreowned%2Fpreowned-list-page.css%5D=1&ajax_page_state%5Bjs%5D%5B0%5D=1&ajax_page_state%5Bjs%5D%5Bsites%2Fall%2Fthemes%2Fcustom%2Ftesla_theme%2Fjs%2Fscript.js%5D=1&ajax_page_state%5Bjs%5D%5Bsites%2Fall%2Fmodules%2Fcontrib%2Fpicture%2Fpicturefill2%2Fpicturefill.min.js%5D=1&ajax_page_state%5Bjs%5D%5Bsites%2Fall%2Fmodules%2Fcontrib%2Fpicture%2Fpicture.min.js%5D=1&ajax_page_state%5Bjs%5D%5Bsites%2Fall%2Fmodules%2Fcontrib%2Fjquery_update%2Freplace%2Fjquery%2F1.8%2Fjquery.min.js%5D=1&ajax_page_state%5Bjs%5D%5Bmisc%2Fjquery.once.js%5D=1&ajax_page_state%5Bjs%5D%5Bmisc%2Fdrupal.js%5D=1&ajax_page_state%5Bjs%5D%5Bsites%2Fall%2Fthemes%2Fcustom%2Ftesla_theme%2Fjs%2Fmodernizr-2.6.2-respond-1.1.0.min.js%5D=1&ajax_page_state%5Bjs%5D%5Bsites%2Fall%2Fthemes%2Fcustom%2Ftesla_theme%2Fjs%2Fselectivizr-min.js%5D=1&ajax_page_state%5Bjs%5D%5Bhttp%3A%2F%2Fwww.teslamotors.com%2Fsites%2Fall%2Flibraries%2Funderscore%2Funderscore.js%5D=1&ajax_page_state%5Bjs%5D%5Bsites%2Fall%2Flibraries%2Ffitvids%2Fjquery.fitvids.js%5D=1&ajax_page_state%5Bjs%5D%5Bsites%2Fall%2Fthemes%2Fcustom%2Ftesla_theme%2Fjs%2Fcommon_functions.js%5D=1&ajax_page_state%5Bjs%5D%5Bhttp%3A%2F%2Fwww.teslamotors.com%2Fsites%2Fall%2Flibraries%2Ftesla_lib%2Fjs%2Futils.js%5D=1&ajax_page_state%5Bjs%5D%5Bhttp%3A%2F%2Fwww.teslamotors.com%2Fsites%2Fall%2Flibraries%2Faccounting%2Faccounting.min.js%5D=1&ajax_page_state%5Bjs%5D%5Bhttp%3A%2F%2Fwww.teslamotors.com%2Fsites%2Fall%2Flibraries%2Ftesla_lib%2Fjs%2Flocalize.js%5D=1&ajax_page_state%5Bjs%5D%5Bsites%2Fall%2Fthemes%2Fcustom%2Ftesla_theme%2Fjs%2Ffooter.js%5D=1&ajax_page_state%5Bjs%5D%5Bsites%2Fall%2Fthemes%2Fcustom%2Ftesla_theme%2Fjs%2Fretina_tesla.js%5D=1&ajax_page_state%5Bjs%5D%5Bhttp%3A%2F%2Fwww.teslamotors.com%2Fsites%2Fall%2Flibraries%2Fba-debug%2Fba-debug.min.js%5D=1&ajax_page_state%5Bjs%5D%5Bsites%2Fall%2Fthemes%2Fcustom%2Ftesla_theme%2Fjs%2Ftemplate.js%5D=1&ajax_page_state%5Bjs%5D%5Bhttp%3A%2F%2Fwww.teslamotors.com%2Fsites%2Fall%2Flibraries%2Fbrowser_detect%2Fbrowser_detect.js%5D=1&ajax_page_state%5Bjs%5D%5Bsites%2Fall%2Fthemes%2Fcustom%2Ftesla_theme%2Fjs%2Fcommon.js%5D=1&ajax_page_state%5Bjs%5D%5Bsites%2Fall%2Fthemes%2Fcustom%2Ftesla_theme%2Fjs%2Fscripts-for-header.js%5D=1&ajax_page_state%5Bjs%5D%5Bsites%2Fall%2Fmodules%2Fcontrib%2Fjquery_update%2Freplace%2Fui%2Fexternal%2Fjquery.cookie.js%5D=1&ajax_page_state%5Bjs%5D%5Bsites%2Fall%2Fmodules%2Fcontrib%2Fjquery_update%2Freplace%2Fmisc%2Fjquery.form.min.js%5D=1&ajax_page_state%5Bjs%5D%5Bmisc%2Fajax.js%5D=1&ajax_page_state%5Bjs%5D%5Bsites%2Fall%2Fmodules%2Fcontrib%2Fjquery_update%2Fjs%2Fjquery_update.js%5D=1&ajax_page_state%5Bjs%5D%5Bsites%2Fall%2Fmodules%2Fcontrib%2Ffitvids%2Ffitvids.js%5D=1&ajax_page_state%5Bjs%5D%5Bsites%2Fall%2Fmodules%2Fcustom%2Ftesla_modal%2Fjs%2Fbootstrap-modals.js%5D=1&ajax_page_state%5Bjs%5D%5Bsites%2Fall%2Fmodules%2Fcustom%2Fcache_buster%2Fcache_buster.js%5D=1&ajax_page_state%5Bjs%5D%5Bsites%2Fall%2Flibraries%2Fcolorbox%2Fjquery.colorbox-min.js%5D=1&ajax_page_state%5Bjs%5D%5Bsites%2Fall%2Fmodules%2Fcontrib%2Fcolorbox%2Fjs%2Fcolorbox.js%5D=1&ajax_page_state%5Bjs%5D%5Bsites%2Fall%2Fmodules%2Fcontrib%2Fcolorbox%2Fstyles%2Fdefault%2Fcolorbox_style.js%5D=1&ajax_page_state%5Bjs%5D%5Bsites%2Fall%2Fmodules%2Fcustom%2Ftesla_cpo_marketing_tool%2Fcpo_filters.js%5D=1&ajax_page_state%5Bjs%5D%5Bsites%2Fall%2Fmodules%2Fcustom%2Ftesla_cpo_marketing_tool%2Fsprites_loading.js%5D=1&ajax_page_state%5Bjs%5D%5Bmisc%2Fprogress.js%5D=1&ajax_page_state%5Bjquery_version%5D=1.8";
    var options = {
      hostname: "www.teslamotors.com",
      path: "/system/ajax",
      method: "POST",
      headers: {
        "Accept":"application/json, text/javascript, */*; q=0.01",
        "Cache-Control":"no-cache",
        "Content-Length":postData.length,
        "Connection":"keep-alive",
        "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8",
        "Cookie":"buy_flow_locale=en_US; __utma=22332990.746438086.1423231647.1431395658.1431739986.16; __utmz=22332990.1431395658.15.10.utmcsr=google|utmccn=(organic)|utmcmd=organic|utmctr=(not%20provided); _gat=1; SESS7bbf44f27bea4eacb69d00a82a5f84cd=eA7cb42V3hi_DrZwvv0VR3B93rdJ7fagaIxC9xGkdN4; BIGipServerwwwb-80=673194250.20480.0000; has_js=1; _ga=GA1.2.746438086.1423231647",
        "Host":"www.teslamotors.com",
        "Origin":"http://www.teslamotors.com",
        "Pragma":"no-cache",
        "Referer":"http://www.teslamotors.com/models/preowned",
        "User-Agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_10_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2465.2 Safari/537.36",
        "X-Requested-With":"XMLHttpRequest",
      },
    };
    console.log(postData);
    var req = http.request(options, function(res) {
      var data = "";
      res.on("data", function(chunk) {
        data += chunk.toString();
      });
      res.on("end", function() {
        dataFromAllHubs.push(JSON.parse(data));
        fetched++;
        if (fetched == HUBS.length) {
          fs.writeFileSync("file.json", JSON.stringify(dataFromAllHubs));
        }
      });
    });
    req.write(postData);
    req.end();
  });
}
