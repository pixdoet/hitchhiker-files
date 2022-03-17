// ==UserScript==
// @name         YouTube patch collection
// @version      0.1
// @description  feel free to modify
// @author       daylin
// @match        www.youtube.com/*
// @icon         https://www.youtube.com/favicon.ico
// @run-at       document-start
// @grant        none
// ==/UserScript==


// polyfill for chrome :vomit:
(function(){
    if("onbeforescriptexecute" in document) return; // Already natively supported

    let scriptWatcher = new MutationObserver(mutations => {
        for(let mutation of mutations){
            for(let node of mutation.addedNodes){
                if(node.tagName === "SCRIPT"){
                    let syntheticEvent = new CustomEvent("beforescriptexecute", {
                        detail: node,
                        cancelable: true
                    })
                    // .dispatchEvent will execute the event synchrously,
                    // and return false if .preventDefault() is called
                    if(!document.dispatchEvent(syntheticEvent)){
                        node.remove();
                    }
                }
            }
        }
    })
    scriptWatcher.observe(document, {
        childList: true,
        subtree: true
    })
})();

(function(){

   const EXP_MOD_POLYMER_JS = false;

   function modifyJson(json) {
      // perform your modifications here;
      // replace yt.config_ with json basically
      // EX: yt.config.EXPERIMENT_FLAGS =>
      //     json.EXPERIMENT_FLAGS
       // custom player js flags :him:
       //json.PLAYER_JS_URL = "/yts/jsbin/player-vfl8BSHQD/en_US/base.js";
       //json.PLAYER_CSS_URL = "/yts/cssbin/player-vflRs9np3/www-player.css";

       // disable slow image loading
      json.DISABLE_YT_IMG_DELAY_LOADING = true;

      // brrr
      json.IS_HOMEPAGE_COLD = true;
      json.IS_RESULTS_PAGE_COLD = true;
      json.WATCH_PAGE_COLD = true;

      // Searchbox settings
      json.SBOX_LABELS.SUGGESTION_DISMISS_LABEL = "Remove";
      json.SBOX_LABELS.SUGGESTION_DISMISSED_LABEL = "Removed!";
      json.SBOX_SETTINGS.IS_POLYMER = false;
      json.EXPERIMENT_FLAGS.desktop_searchbar_style = "bar_without_clear_icon";

      // These are for the new icons (ew)

      json.EXPERIMENT_FLAGS.kevlar_system_icons = false;
      json.EXPERIMENT_FLAGS.kevlar_update_youtube_sans = false;
      json.EXPERIMENT_FLAGS.kevlar_updated_logo_icons = false;
      json.EXPERIMENT_FLAGS.kevlar_update_topbar_logo_on_create = false;

      // players
      // json.EXPERIMENT_FLAGS.kevlar_watch_snap_sizing = true;
      json.EXPERIMENT_FLAGS.kevlar_use_ytd_player = false;

      // homepage
      json.EXPERIMENT_FLAGS.rich_grid_content_visibility_optimization = false;
      json.EXPERIMENT_FLAGS.rich_grid_enable_edge_to_edge = false;
      json.EXPERIMENT_FLAGS.rich_grid_mini_mode = false;
      json.EXPERIMENT_FLAGS.kevlar_enable_loading_shorts_buttons = false;

      // shorts
      json.EXPERIMENT_FLAGS.enable_shorts_ux_improvement_web = true;
      json.EXPERIMENT_FLAGS.web_shorts_url_but_serve_watch_page = true;

       // misc.
      json.EXPERIMENT_FLAGS.web_favicon_image_update = false;
      json.EXPERIMENT_FLAGS.is_part_of_any_user_engagement_experiment = false;
       json.EXPERIMENT_FLAGS.render_unicode_emojis_as_small_images = true;

       json.WEB_PLAYER_CONTEXT_CONFIGS
         .WEB_PLAYER_CONTEXT_CONFIG_ID_KEVLAR_WATCH
         .serializedExperimentFlags = modifyPlayerExperiments(
            json.WEB_PLAYER_CONTEXT_CONFIGS
               .WEB_PLAYER_CONTEXT_CONFIG_ID_KEVLAR_WATCH
               .serializedExperimentFlags
         );
      window.setTimeout(startHtmlMods(),100);

      // ------------------------------- //
       console.log("Experiment flags modified");
      return JSON.stringify(json);
   }

   function modifyPlayerExperiments(text) {
      var flags = deserialiseFlags(text);

      // perform your modifications here;
      // due to the encoding of these, the value
      // will always be a string (rather than a bool,
      // for instance)

      flags.web_player_bigger_buttons_like_mobile = "false";
      flags.web_new_autonav_countdown = "false";
      flags.web_player_move_autonav_toggle = "false";
      flags.web_player_touch_mode_improvements = "false";
      flags.web_player_orchestration = "false";
      flags.web_player_seek_chapters_by_shortcut = "false"; // old seek ui
      flags.web_player_larger_tap_buttons_killswitch = "true";
      flags.web_settings_menu_icons = "false";
      flags.web_player_innertube_share_panel = "false";

      flags.player_destroy_old_version = "false";

      // ------------------------------- //
      console.log("Player flags modified");
      var response = serialiseFlags(flags);
      return response;
   }

   function serialiseFlags(json) {
      var keys = Object.keys(json),
      response = "";

      for (var i = 0, j = keys.length; i < j; i++) {
         if (i > 0) {
            response += "&";
         }
         response += keys[i] + "=" + json[keys[i]];
      }

      return response;
   }

   function deserialiseFlags(text) {
      // player experiments (and maybe more) are serialised
      // this makes it harder to modify
      // so we don't want that

      var a = text.split("&"),
      obj = {};

      for (var i = 0, j = a.length; i < j; i++) {
         var b = a[i].split("=");
         var key = b[0];
         var val = b[1];
         obj[key] = val;
      }

      return obj;
   }

   function extractYtConfigJson(text) {
      const open = "ytcfg.set(";
      const close = ");";

      // regex painful; quick hack fuck you
      var a = text.split(open);
      var b = a[1].split(close);
      return b[0];
   }

   function modifyYtConfig(text) {
      var originalJson = extractYtConfigJson(text);
      var parsedJson = JSON.parse(originalJson);

      var modifiedJson = modifyJson(parsedJson);

      var newText = text.replace(originalJson, modifiedJson);
      return newText;
   }

   function startHtmlMods() {
      document.getElementsByTagName('html')[0].removeAttribute('system-icons');
      //document.querySelectorAll('[aria-label="Shorts"]')[0].remove();
       console.log("HTML Mods completed");
   }

   async function waitForElm(s) {
      while (document.querySelector(s) === null) {
         await new Promise(r => requestAnimationFrame(r))
      }
      return document.querySelector(s);
   }

   async function modPolymerJs(srcUrl) {
      // doesn't cache well ig :/
      var js, jsContent, jsMod, se;
      js = await fetch(srcUrl);
      jsContent = await js.text();

      jsMod = jsContent.replaceAll("shortViewCountText", "viewCountText");

      se = document.createElement("script");
      se.textContent = jsMod;
      document.head.appendChild(se);
   }

   const handleScript = (e) => {
      let script = e.details || e.target; // polyfill hack

      if (script.textContent.search('{window.ytplayer={};') > -1) {
         script.textContent = modifyYtConfig(script.textContent);
      } else if (EXP_MOD_POLYMER_JS && script.src.search("desktop_polymer") > -1) {
         console.log("hi");
         e.preventDefault();
         modPolymerJs(script.src);
      }
   };
    window.setTimeout(() => {
        document.querySelectorAll("[aria-label='Shorts']")[0].remove();
    },
                      100);
   document.addEventListener("beforescriptexecute", handleScript);
   window.setTimeout(() => {
         document.removeEventListener("beforescriptexecute", handleScript)

      },
      5000
   );

})();
