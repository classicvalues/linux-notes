//~~tv:7110.20170223
//~~tc: Added support for Client ID mapping.
//~~tc: Update mapping of Tracker ID


window.GoogleAnalyticsObject = "" || "ga";

window[window.GoogleAnalyticsObject] = window[window.GoogleAnalyticsObject] || function() {
  (window[window.GoogleAnalyticsObject].q = window[window.GoogleAnalyticsObject].q || []).push(arguments);
};

//tealium universal tag - utag.sender.7110 ut4.0.202103121810, Copyright 2021 Tealium.com Inc. All Rights Reserved.

try {
  (function(id, loader) {
    var u = {};
    utag.o[loader].sender[id] = u;
    // Start Tealium loader
    // Please do not modify
    if (utag.ut === undefined) { utag.ut = {}; } if (utag.ut.loader === undefined) { u.loader = function (o) { var a, b, c, l; a = document; if (o.type === "iframe") { b = a.createElement("iframe"); b.setAttribute("height", "1"); b.setAttribute("width", "1"); b.setAttribute("style", "display:none"); b.setAttribute("src", o.src); } else if (o.type === "img") { utag.DB("Attach img: " + o.src); b = new Image(); b.src = o.src; return; } else { b = a.createElement("script"); b.language = "javascript"; b.type = "text/javascript"; b.async = 1; b.src = o.src; } if (o.id) { b.id = o.id; } if (typeof o.cb === "function") { b.hFlag = 0; b.onreadystatechange = function () { if ((this.readyState === 'complete' || this.readyState === 'loaded') && !b.hFlag) { b.hFlag = 1; o.cb(); } }; b.onload = function () { if (!b.hFlag) { b.hFlag = 1; o.cb(); } }; } l = o.loc || "head"; c = a.getElementsByTagName(l)[0]; if (c) { utag.DB("Attach to " + l + ": " + o.src); if (l === "script") { c.parentNode.insertBefore(b, c); } else { c.appendChild(b); } } }; } else { u.loader = utag.ut.loader; }
    if (utag.ut.typeOf === undefined) { u.typeOf = function(e) {return ({}).toString.call(e).match(/\s([a-zA-Z]+)/)[1].toLowerCase();};} else { u.typeOf = utag.ut.typeOf; }
    // End Tealium loader
    u.ev = {'view': 1, 'link': 1};
    u.o = window[window.GoogleAnalyticsObject];
    u.required = {};
    u.created = false;
    // Perform operation for all trackers (params used differently for "set")
    u.all = function(e, o, v, a, b, c) {
      for (var i = 0; i < u.data.account.length; i++) {
        var t = (u.data.name[i] ? u.data.name[i] + "." : "");
        if (o === "event") {
          u.o(t + e, o, v, a, b, c)
        } else if (v) {
          u.o(t + e, o, v)
        } else {
          u.o(t + e, o);
        }
      }
    };
    // this is a private function used for adding events to GA hits. must not be used for any other purpose
    u.setHitData = function(g, a, b, f) {
      var obj = u.data[a];
      for (var d in utag.loader.GV(obj)) {
        if (b && d.indexOf("enh_" + b + "-") !== 0 && d.indexOf("enh_all-") !== 0) {
          continue;
        }
        var idx = d.split("-")[1],
            val = obj[d];
        if (u.typeOf(val) !== "array") {
          g[idx] = val;
        } else {
          g[idx] = val[f];
        }
      }
    };

    //Add and event to GA {eventCategory : "", eventAction : "", eventValue : ""}
    u.addEvent = function(v) {
      if (typeof v.eventCategory == "undefined" || typeof v.eventAction == "undefined") {
        utag.DB("GA event Category or Action is not set");
        return;
      }
      if (isNaN(parseInt(v.eventValue))) {
        utag.DB("GA event Value is not a number");
        v.eventValue = null;
      } else {
        v.eventValue = parseInt(v.eventValue) || null;
      }
      u.data.ga_events.push(v);
    };
    // accepts an event type and the length of the product array, impression - true/false
    u.addproduct = function(event_type, len, imp) {
      var g = {}, i, j, k = [];

      if (imp === true) {
        k = ( u.data.enh_impression_id.length ? u.data.enh_impression_id : u.data.enh_impression_name );
        for (i = 0; i < k.length; i++) {
          g = {};
          g.id = (u.data.enh_impression_id[i] ? u.data.enh_impression_id[i] : "");
          g.name = (u.data.enh_impression_name[i] ? u.data.enh_impression_name[i] : "");
          g.brand = (u.data.enh_impression_brand[i] ? u.data.enh_impression_brand[i] : "");
          g.variant = (u.data.enh_impression_variant[i] ? u.data.enh_impression_variant[i] : "");
          g.category = (u.data.enh_impression_category[i] ? u.data.enh_impression_category[i] : "");
          g.list = (u.data.enh_impression_list[i] ? u.data.enh_impression_list[i] : "");
          g.price = (u.data.enh_impression_price[i] ? u.data.enh_impression_price[i] : "");
          g.position = (u.data.enh_impression_position[i] ? u.data.enh_impression_position[i] : "");
          u.setHitData(g, "enhecom_events", event_type, i);
          u.clearEmptyKeys(g);
          u.all('ec:addImpression', g);
        }
      } else {
        for (i = 0; i < len; i++) {
          g = {};
          if (u.data.autofill_params === "true") { //UI config & mapping to set default vals - default to true
            for (j = 0; j < u.data.product_id.length; j++) {
              u.data.product_name[j] = u.data.product_name[j] || u.data.product_id[j];
              u.data.product_unit_price[j] = u.data.product_unit_price[j] || "1.00";
              u.data.product_quantity[j] = u.data.product_quantity[j] || "1";
            }
          }
          g.id = u.data.product_id[i];
          g.name = (u.data.product_name[i] ? u.data.product_name[i] : "");
          g.brand = (u.data.product_brand[i] ? u.data.product_brand[i] : "");
          g.variant = (u.data.product_variant[i] ? u.data.product_variant[i] : "");
          g.category = (u.data.product_category[i] ? u.data.product_category[i] : "");
          g.price = (u.data.product_unit_price[i] ? u.data.product_unit_price[i] : "");
          g.quantity = (u.data.product_quantity[i] ? u.data.product_quantity[i] : "");
          g.coupon = (u.data.product_discount[i] ? u.data.product_discount[i] : "");
          g.position = (u.data.product_position[i] ? u.data.product_position[i] : "");
          u.setHitData(g, "enhecom_events", event_type, i);
          u.clearEmptyKeys(g);
          u.all('ec:addProduct', g);
        }
      }
    };

    u.addpromo = function(action, event) {
      var f, g;
      for (f = 0; f < u.data.enh_promo_id.length; f++) {
        g = {};
        g.id = u.data.enh_promo_id[f];
        g.name = (u.data.enh_promo_name[f] ? u.data.enh_promo_name[f] : u.data.enh_promo_id[f]);
        g.creative = (u.data.enh_promo_creative[f] ? u.data.enh_promo_creative[f] : "");
        g.position = (u.data.enh_promo_position[f] ? u.data.enh_promo_position[f] : "");
        u.clearEmptyKeys(g);  
        u.all('ec:addPromo', g);
      }
      if (action === "promo_click" && event === "link") {
        u.all('ec:setAction', u.data.enh_action);
        if (u.data.autosend_events === "true"){
          u.all('send', 'event', 'Internal Promotions', 'click', (g.name ? g.name : g.id), {'hitCallback': u.data.enh_event_cb});
        }
      }
    };
    u.createTracker = function() {
      var i, tn, start;
      u.data.account = u.data.tid || u.data.account;
      if (u.typeOf(u.data.account) === "string") {
        u.data.account = u.data.account.replace(/\s/g, "").split(",");
      }
      // if there is no tracker name defined, but there are multiple trackers, auto-generate one with the name tealium_[1|2|3|4 etc.]
      if (u.typeOf(u.data.name) === "string" && u.data.name !== "") {
        u.data.name = u.data.name.replace(/\s/g, "").split(",");
      }

      if (!u.data.name || u.data.name.length !== u.data.account.length) {
        start = u.data.name.length !== u.data.account.length ? u.data.name.length : 0;
        tn = utag.tagsettings.gua.trackernames;
        u.data.name = u.data.name || [];
        for (i = start; i < u.data.account.length; i++) {
          u.data.name.push("tealium_" + (i + tn));
        }
        utag.tagsettings.gua.trackernames = tn + i;
      }
    };
    u.initTracker = function() {
      var c, f;
      if (!u.created) {
        u.created = true;
        for (f = 0; f < u.data.account.length; f++) {
          c = {};
          if (u.data.siteSpeedSampleRate) {c.siteSpeedSampleRate = parseInt(u.data.siteSpeedSampleRate);}
          if (u.data.sampleRate) {c.sampleRate = parseFloat(u.data.sampleRate);}
          c.cookieDomain = u.data.cookieDomain;
          if (u.data.cookieExpires || u.data.cookieExpires === "0") {c.cookieExpires = parseInt(u.data.cookieExpires);}
          if (u.data.legacyCookieDomain) {c.legacyCookieDomain = u.data.legacyCookieDomain;}
          c.allowLinker = u.data.allowLinker;
          if (typeof u.data.name[f] !== "undefined" && u.data.name[f] !== "") {c.name = u.data.name[f];}
          if (u.data.clientId) {c.clientId = u.data.clientId;}
          u.o("create", u.data.account[f], c);
        }
        if (u.data.global_event_cb) {
         u.all('set', 'hitCallback', u.data.global_event_cb);
        }
        // Digikey Customization to set a Client ID Custom Dimension
        ga(function() {
            var tracker = ga.getByName(c.name);
            utag.data['google_client_id'] = tracker.get('clientId');
            tracker.set('dimension111',utag.data['google_client_id']);
        });

        // Digikey Customization to intialize Optimizely
        if (u.data.optimizely === "true") { window.optimizely = window.optimizely || []; window.optimizely.push(['activateUniversalAnalytics']);}
      }
    };

    // loops through and sets all properties that have to be set using the "set" command
    u.setGlobalProperties = function (data, reset, custom_property) {
      // known params - this can be updated if more get introduced later
      // supports boolean (string or boolean) types also if "type" is set to "bool"
      var map = {
        "uid" : {"name" :"&uid", "type" : "exists"},
        "page" : {"name" : "page", "type" : "exists"},
        "title" : {"name" : "title", "type" : "exists"}, 
        "location" : {"name" : "location", "type" : "exists"},
        "campaignId" : {"name" :"campaignId", "type" : "exists"},
        "campaignName" : {"name" :"campaignName", "type" : "exists"},
        "campaignSource" : {"name" : "campaignSource", "type" : "exists"},
        "campaignMedium" : {"name" : "campaignMedium", "type" : "exists"},
        "campaignContent" : {"name" : "campaignContent", "type" : "exists"},
        "campaignKeyword" : {"name" : "campaignKeyword", "type" : "exists"},
        "dataSource" : {"name" : "dataSource", "type" : "exists"}
      },
      prop;
      // allow one-off items to be reset if passed in
      if (custom_property && reset) {
        u.all("set", custom_property, "");
      }
      // loop through the known parameters, and either reset them if reset is true, or set them if not
      for (prop in utag.loader.GV(map)) {
          if (reset) {
            u.all("set", map[prop].name, "");
          } else {
            // handle "boolean" case
            if (map[prop].type === "bool") {
              if (data[prop] == true || data[prop] === "true") {
                u.all("set", map[prop].name, true);
              }
            } 
            // handle default case and just check if the parameter exists on u.data
            else if (map[prop].type === "exists") {
              if (data[prop]) {
                u.all("set", map[prop].name, data[prop]);
              }
            }
          }
      }
    };

    window.utag.tagsettings  = window.utag.tagsettings || {};
    window.utag.tagsettings.gua =  window.utag.tagsettings.gua  || {};
    window.utag.tagsettings.gua.trackernames =  window.utag.tagsettings.gua.trackernames  || 0;

      u.map={"google_tracking_id":"tid,account","Google_tracking_name":"name","page_title":"title","google_pages":"page","order_id_on_confirmation_page":"order_id","order_subtotal_in_usd":"transaction-metric8","supplier_id":"dimension1","dom.referrer":"pageview-dimension2","page_language":"dimension3","page_site":"dimension4","page_type":"dimension5","page_sub_type":"dimension6","ref_page_type":"pageview-dimension8,link-dimension8","page_id":"dimension7","ref_page_sub_type":"pageview-dimension12,link-dimension12","ref_page_id":"pageview-dimension9,link-dimension9","ref_page_event":"eventAction,pageview-dimension10,link-dimension10","event_category":"eventCategory","registration_status":"dimension13","asset_type":"link-dimension14,pageview-dimension14","doi_tab":"pageview-dimension16","ph_id":"pageview-dimension17","ref_part_id":"pageview-dimension19,link-dimension19","ref_pn_sku":"pageview-dimension20,link-dimension20","ref_supplier_id":"pageview-dimension21,link-dimension21","rma_id":"pageview-dimension22","techzone_name":"pageview-dimension23","Visitor_ID_from_WT_FPC":"dimension24","ptm_id":"pageview-dimension18","marketo_tracking_id":"pageview-dimension26","Timezone":"dimension27","event_label":"eventLabel","tealium_visitorid":"dimension28","tealium_visitid":"dimension29","not_a_pageview":"nonInteraction","part_search_term":"pageview-dimension31,link-dimension31","part_search_results_count":"pageview-dimension32","part_search_filter":"pageview-dimension33","show_top_results":"pageview-dimension34","part_search_term_ext":"pageview-dimension35,link-dimension35","init_srch_count":"pageview-metric1","resource":"pageview-dimension36","content_search_keywords":"dimension37","content_search_pre_filters":"pageview-dimension39","content_search_filters":"pageview-dimension33","ref_content_search_keywords":"pageview-dimension40","ref_content_search_filters":"pageview-dimension41","catalog_search":"pageview-dimension42","selected_suppliers":"pageview-dimension43","content_search_results_count":"metric2","personalization_program":"link-dimension44,link-dimension141","personalization_creative":"link-dimension45,link-dimension142","current_search_engine":"pageview-dimension46","checkout_step":"enh_checkout_step","google_action":"enh_action","g_t_part_sku":"product_id","g_t_part_id":"product_name","order_currency":"pageview-dimension71,link-dimension71","order_subtotal":"pageview-metric3","promo_id":"enh_promo_id","promo_creative":"enh_promo_creative","promo_position":"enh_promo_position","merch_id":"link-dimension47","merch_campaign":"link-dimension48","merch_placement":"link-dimension49","merch_target":"link-dimension50","email_id":"pageview-dimension51,pageview-dimension70","social_media_campaign":"pageview-dimension54,pageview-dimension66","vanity_campaign":"pageview-dimension55,pageview-dimension67","webapp_campaign":"pageview-dimension56,pageview-dimension68","aggregator_or_supplier_campaign":"pageview-dimension57,pageview-dimension64","supplier_landing_page_campaign":"pageview-dimension58,pageview-dimension69","is_doubleclick_ad":"pageview-dimension59","is_paid_search":"pageview-dimension60","campaign_supplier":"pageview-dimension61,pageview-dimension11","campaign_site":"pageview-dimension62","campaign":"campaignName","paid_search_term":"campaignKeyword","campaign_content":"campaignContent","campaign_medium":"campaignMedium","campaign_source":"campaignSource","uses_new_google_campaigns":"pageview-dimension38","page_content_group":"contentGroup1","page_content_sub_group":"contentGroup2","registered_user_id":"pageview-dimension82","pn_sku":"pageview-dimension83,link-dimension83","part_id":"pageview-dimension84,link-dimension84","success_is_different_page":"pageview-dimension85","from_file":"pageview-dimension86","number_part_added":"pageview-dimension87","bom_name":"pageview-dimension88","add_part_method":"pageview-dimension89,link-dimension89","ad_group":"pageview-dimension90","ext_host":"link-dimension91","ext_uri":"link-dimension92","g_t_part_supplier":"product_brand","google_location":"location","invoice_id":"pageview-dimension76","part_search_category":"pageview-dimension73","pre_order_id":"pageview-dimension65,link-dimension65","sales_order_id":"pageview-dimension75","salesorder":"pageview-dimension74","video_id":"link-dimension52","video_playlist_id":"link-dimension53","video_source":"dimension63","ref_page_category":"pageview-dimension93,link-dimension93","category":"pageview-dimension94,link-dimension94","ref_customer":"pageview-dimension95","cart_origination":"pageview-dimension96","order_payment_type":"pageview-dimension97","use_top_pick":"pageview-dimension98","num_records":"pageview-metric4","rdl_cat_id":"pageview-dimension99","free_shipping_msg":"pageview-dimension100","detail_title":"pageview-dimension101","external_search":"pageview-dimension102","company_type":"pageview-dimension103","experimentId":"pageview-dimension104","variationId":"pageview-dimension105","optimizelyExperiment":"pageview-dimension106","userAgent":"dimension108","ExtRun":"pageview-dimension72,link-dimension72","ref_page_sub_cat":"pageview-dimension110","google_user_id":"uid,dimension112","qp.audience":"pageview-dimension113","google_cust_id":"dimension25","st_campaign":"dimension118","manufacturer_part_number":"dimension119","html_element1":"pageview-dimension117,link-dimension117","html_element2":"pageview-dimension120,link-dimension120","html_element3":"pageview-dimension121,link-dimension121","html_element4":"pageview-dimension122,link-dimension122","st_campaign_supplier_id":"dimension123","gua_event_category":"eventCategory","gua_event_action":"eventAction","gua_event_label":"eventLabel","page_state":"pageview-dimension127,link-dimension127","line_item_price_a":"product_unit_price","part_category_a":"product_category","part_description_a":"product_name","part_qty_a":"product_quantity","part_sku_a":"product_id","shipment_method":"pageview-dimension129","stock_status_a":"enh_product_add-dimension115,enh_detail-dimension115,enh_product_purchase-dimension115,enh_product_remove-dimension115,enh_product_checkout-dimension115","part_id_a":"enh_product_add-dimension114,enh_detail-dimension114,enh_product_purchase-dimension114,enh_product_remove-dimension114,enh_product_checkout-dimension114","supplier_id_a":"product_brand","tealium_event:cart_add":"add","tealium_event:product_view":"detail","tealium_event:remove_part":"remove","tealium_event:checkout":"checkout","tealium_event:checkout_option":"checkout_option","tealium_event:purchase":"purchase","current_order_value":"link-dimension130","consentData":"pageview-dimension133,link-dimension133","evergageID":"link-dimension132","translated_content":"pageview-dimension134","personalization_state":"pageview-dimension136,link-dimension136","marketplace_sales":"pageview-dimension135","web_id_a":"enh_product_add-dimension116,enh_detail-dimension116,enh_product_purchase-dimension116,enh_product_remove-dimension116,enh_product_checkout-dimension116","part_type_a":"enh_product_add-dimension137,enh_detail-dimension137,enh_product_purchase-dimension137,enh_product_remove-dimension137,enh_product_checkout-dimension137","vendor_type":"pageview-dimension138,link-dimension138","marketplace_revenue_usd":"transaction-metric7","query_string":"pageview-dimension30","ref_page_state":"pageview-dimension139","ref_pers_state":"pageview-dimension140","ipAddress":"pageview-dimension11","available_parameters":"pageview-dimension147","selected_parameters":"pageview-dimension148","newly_selected_parameters":"pageview-dimension149","total_order_subtotal_usd":"revenue","pcb_revenue_usd":"transaction-metric9","dark_mode":"dimension150","ut.version":"dimension151","cs_matching_key":"pageview-dimension152","number_results_returned_from_search":"pageview-metric10,link-metric10","project_id":"pageview-dimension157,link-dimension157"};
  u.extend=[function(a,b){ try{ if(1){
utag.runonce = utag.runonce || {};
utag.runonce.ext = utag.runonce.ext || {};
if (typeof utag.runonce.ext[532] == 'undefined') {
    utag.runonce.ext[532] = 1;
                    
    //Remove any empty parameters
    u.clearEmptyKeys = function(object) {
        for (var key in object) {
            if (object[key] === "" || object[key] === undefined) {
                delete object[key];
            }
        }
        return object;
    };
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if((typeof b['part_qty_a']=='undefined'&&typeof b['js_page.window.cart2']!='undefined')||(typeof b['part_qty_a']!='undefined'&&typeof b['part_qty_a']!='undefined'&&b['part_qty_a']==''&&typeof b['js_page.window.cart2']!='undefined')){b['part_qty_a']=b['product_quantities']} } catch(e){ utag.DB(e); }  },
function(a,b){ try{ if(1){

// For Any page
utag.insertTag('class','richtextcontent','Select Link in Text',null,null,'all');

// China RMB
utag.insertTag('class','searchbox-inner-searchbutton','Initiate Search');
utag.insertTag('id','btnSubmit','Complete Registration','MDK','HP',0,'cookie-tracking');
utag.insertTag('class','qq-chat','Connect to WeChat',null,null,0,'track-data');
utag.insertTag('id','feedback','Provide Feedback',null,null,0,'track-data');
utag.insertTag('class','button primary lock','Checkout Event;google_action=checkout;checkout_step=1','SC','CO',"all",'track-data');
//utag.insertTag('id','btnCheckout','Checkout Event;google_action=checkout;checkout_step=1','SC','CO',"all",'track-data');
//utag.insertTag('id','shippingContinueSubmitButton','Submit Address;checkout_step=2','SC','SCAD',0,'cookie-tracking');
//utag.insertTag('id','billingContinueSubmitButton','Submit Address;checkout_step=4','SC','SCAD',0,'cookie-tracking');

// Homepage
utag.insertTag('class','homepage-featured','Link to Featured Pages','HP','HP',0);
utag.insertTag('class','homepage-featured__content','Link to Featured Pages','HP','HP',0);

// Part Search
utag.insertTag('class','filter-toggle','Change Parametric Search Presentation','PS','FAM',null,'track-data');
utag.insertTag('class','dload-btn','Download Table','PS','FAM',1,'track-data');
utag.insertTag('class','paging-inner','Change Page in Search Results','PS','FAM');
utag.insertTag('class','download-table','Download Table','PS','FAM');
utag.insertTag('id','naddfav','Add to Favorites','PS','PD',null,'track-data');
utag.insertTag('id','custom-search-button','Initiate Search','PS','NR');
//utag.insertTag('class','jss386','Show More Top Results','PS','SR',0,'track-data');

// All Content Search Pages
utag.insertTag('class','pager','Change Page in Search Results');
utag.insertTag('class','results-per-page','Change Number of Results Displayed');  //This doesn't work in part search because there is no trackable event

// Product Highlight Pages
utag.insertTag('class','richtextcontent','Select Link in Text','SP','PH','all');
utag.insertTag('class','richtextcontent','Select Link in Text','DT','LP','all');
utag.insertTag('class','richtextcontent','Select Link in Text','RE','RE','all');
utag.insertTag('class','searchbar','Search Content','PH','PHN',0);
utag.insertTag('class','view-all','View All Suppliers','PH','PHN',0);

// Conversion Pages
utag.insertTag('class','calcResults','Select Resulting Component','COV','all');
utag.insertTag('class','calcViewResults','View All Resulting Components','COV','all');
utag.insertTag('class','related-resistors','View Related Components','COV','all');

// Shopping Cart and Checkout
utag.insertTag('class','button-checkout','Checkout;checkout_step=1','SC','CO',0,'cookie-tracking');
utag.insertTag('class','button-checkout','Checkout;checkout_step=1','SC','CO',1,'cookie-tracking');
utag.insertTag('class','already-registered','Login from Checkout;checkout_step=1','SC','CO',0,'cookie-tracking');
utag.insertTag('class','already-registered','Login from Checkout;checkout_step=1','SC','CO',1,'cookie-tracking');
utag.insertTag('id','registerButton','Submit Registration','SC','SCN',0,'track-data');
//utag.insertTag('class','cartRowShippedByMessage','View Marketplace Message','SC','CO',0,'track-data');
// Until new CIM
utag.insertTag('id','ctl00_ctl00_mainContentPlaceHolder_mainContentPlaceHolder_btnContinue','Continue as Guest;ref_page_type=RU;ref_page_sub_type=LOG;ref_page_id=In Process Login',null,null,null,'cookie-tracking');

// BOM
utag.insertTag('id','btnAddToBom','Add to BOM', 'BOM','BOM');
utag.insertTag('class','btnCreateQuote','Create Quote', 'BOM','BOM','all','cookie-tracking');
utag.insertTag('class','btnShareBom','Copy BOM', 'BOM','BOM','all','track-data');
utag.insertTag('class','btnSaveRevision','Save BOM Revision', 'BOM','BOM','all','data-track-data');
utag.insertTag('class','btnEnterAssemblies','Enter Assemblies', 'BOM','BOM','all','data-cookie-tracking');

// Online Catalog
utag.insertTag('class','datasheet-link','Display Part Documents;asset_type=Datasheet','DYC','PG','all','track-data');

// Supplier Portal
utag.insertTag('class','accordionContent','Link to Product Family', 'SP','SP',"all");

// Tech Forum
utag.insertTag('id','header_0__centerDropdowns','Header Nav', 'TEC','RES');
utag.insertTag('id','header_0__centerDropdowns','Header Nav', 'TEC','PST');

// PCB Builder
utag.insertTag('class','section__support__ctas','View Support Topic', 'PCB','LP');
utag.insertTag('class','dk-btn__primary dk-btn--lg','Try PCB Tool', 'PCB','LP',0);


// My Digi-Key
utag.insertTag('class','dk-nav__link','MyDigiKey Nav', 'MDK', 'all','all','cookie-tracking');

// Search 2.0
utag.insertTag('class','jss387 MuiGrid-justify-xs-center','Show More Top Results','PS','SR','0','track-data'); //test
utag.insertTag('class','jss361 MuiGrid-justify-xs-center','Show More Top Results','PS','SR','0','track-data'); //production

// PDP
utag.insertTag('class','quantity-message','View Marketplace Message','PS','PD',0,'track-data'); 





} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
if (typeof utag.data['dom.domain'] != 'undefined' && utag.data['dom.domain'].toLowerCase().indexOf('digikey.cn') >= 0) {
    b.currency = b.order_currency = (utag.data['cp.cur'] === 'USD')?'USD':'CNY';
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(typeof b['page_site']!='undefined'){try{b['page_site']=b['page_site'].toUpperCase();}catch(e){}} } catch(e){ utag.DB(e); }  },
function(a,b){ try{ if((typeof b['page_site']!='undefined'&&b['page_site'].toString().toLowerCase()=='gb'.toLowerCase())){b['page_site']='UK'} } catch(e){ utag.DB(e); }  },
function(a,b){ try{ if(typeof b['page_site']=='undefined'){b['page_site']='(Not Set)'} } catch(e){ utag.DB(e); }  },
function(a,b){ try{ if((typeof b['page_sub_type']!='undefined'&&b['page_sub_type'].toString().toLowerCase()=='PH'.toLowerCase())){b['ph_id']=b['page_id']} } catch(e){ utag.DB(e); }  },
function(a,b){ try{ if(1){
//Google Analytics Changes for Ordering Team - 358

if ((typeof b['order_weborder_number'] != 'undefined' && typeof b['order_subtotal'] != 'undefined')) {
    b['order_id_on_confirmation_page'] = b['order_weborder_number'];
    b["ExtRun"] = utag.dkTrk('358.1');
}

if (a == 'view') {
    b.repressPageview = false;
    if (b.page_type === 'SC' && b.page_sub_type === 'SCN') {
        b.repressPageview = true;
    }
}

} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
if (typeof b['page_content_group'] != 'undefined') {
                        b['page_content_group'] = decodeURIComponent(b['page_content_group']);
                    }
                    if (typeof b['page_content_sub_group'] != 'undefined') {
                        b['page_content_sub_group'] = decodeURIComponent(b['page_content_sub_group']);
                    }
                    if (typeof b['page_title'] != 'undefined') {
                        b['page_title'] = decodeURIComponent(b['page_title']);
                    }
                    if (typeof b['ref_page_event'] != 'undefined') {
                        b['ref_page_event'] = decodeURIComponent(b['ref_page_event']);
                    }
                    if (typeof b['content_search_filters'] != 'undefined') {
                        b['content_search_filters'] = decodeURIComponent(b['content_search_filters']);
                    }
                    if (typeof b['content_search_pre_filters'] != 'undefined') {
                        b['content_search_pre_filters'] = decodeURIComponent(b['content_search_pre_filters']);
                    }
                    if (typeof b['ref_content_search_filters'] != 'undefined') {
                        b['ref_content_search_filters'] = decodeURIComponent(b['ref_content_search_filters']);
                    }
                    if (typeof b['content_search_keywords'] != 'undefined') {
                        b['content_search_keywords'] = decodeURIComponent(b['content_search_keywords']).toLowerCase();
                    }
                    if (typeof b['ref_content_search_keywords'] != 'undefined') {
                        b['ref_content_search_keywords'] = decodeURIComponent(b['ref_content_search_keywords']).toLowerCase();
                    }
                    if (typeof b['merch_id'] != 'undefined') {
                        b['merch_id'] = decodeURIComponent(b['merch_id']);
                    }
                    if (typeof b['merch_placement'] != 'undefined') {
                        b['merch_placement'] = decodeURIComponent(b['merch_placement']);
                    }
                    if (typeof b['merch_target'] != 'undefined') {
                        b['merch_target'] = decodeURIComponent(b['merch_target']);
                    }
                    if (typeof b['merch_campaign'] != 'undefined') {
                        b['merch_campaign'] = decodeURIComponent(b['merch_campaign']);
                    }
                    if (typeof b['page_id'] != 'undefined') {
                        b['page_id'] = decodeURIComponent(b['page_id']);
                    }
                    if (typeof b['ref_page_id'] != 'undefined') {
                        b['ref_page_id'] = decodeURIComponent(b['ref_page_id']);
                    }
                    if (typeof b['page_state'] !== 'undefined') {
                        b['page_state'] = decodeURIComponent(b['page_state']);
                    }
if (typeof b['video_source'] != 'undefined') {
  b['video_source'] = decodeURIComponent(b['video_source']);
  b['video_source'] = b['video_source'].replace(/_/g, " ");
}
if (typeof b['techzone_name'] != 'undefined') {
  b['techzone_name'] = decodeURIComponent(b['techzone_name']);
}
if (typeof b['resource'] != 'undefined') {
  b['resource'] = decodeURIComponent(b['resource']);
}

if (typeof utag.data['page_id'] != 'undefined') {
                        utag.data['page_id'] = decodeURIComponent(utag.data['page_id']);
                    }
if (typeof utag.data['ptm_id'] != 'undefined') {
                        utag.data['page_id'] = decodeURIComponent(utag.data['page_id']);
                    }
if (typeof utag.data['ph_id'] != 'undefined') {
                        utag.data['page_id'] = decodeURIComponent(utag.data['page_id']);
                    }

if (typeof b['ref_page_category'] != 'undefined') {
    b['ref_page_category'] = decodeURIComponent(b['ref_page_category']);
}



} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if((b['page_type']=='PS'&&b['page_sub_type']=='PD')){b['google_action']='detail';try{b['product_sku']=b['pn_sku'].split(',')}catch(e){};try{b['product_number']=b['part_id'].split(',')}catch(e){};try{b['product_brands']=b['supplier_id'].split(',')}catch(e){}} } catch(e){ utag.DB(e); }  },
function(a,b){ try{ if(1){
d = new Date;
b['Timezone'] = parseInt(d.getTimezoneOffset() / 60 * -1) || "0";
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(typeof b['js_page.window.cart2']=='undefined'){try{b['_cprod']=(function () { return; })()}catch(e){};try{b['_cprodname']=(function () { return; })()}catch(e){};try{b['_cbrand']=(function () { return; })()}catch(e){};try{b['_cprice']=(function () { return; })()}catch(e){};b['_ccurrency']='USD'} } catch(e){ utag.DB(e); }  },
function(a,b){ try{ if(typeof b['js_page.window.cart2']=='undefined'){
if (a == 'view') {
  if (b['page_type'] == 'Ordering') {
      b['google_action'] = 'add';
      b["ExtRun"] = utag.dkTrk('260.1');
  }
  if (b['page_type'] == 'SC') {
      b["ExtRun"] = utag.dkTrk('260.2');
      switch (b['page_sub_type']) {
        case 'CO':
            b['google_action'] = 'add';
            break;
        case 'SCAD':
            b['google_action'] = 'checkout';
            b['checkout_step'] = '2';
            break;
        case "SI":
            b['google_action'] = 'checkout';
            b['checkout_step'] = '3';
            break;
        case "BL":
            b['google_action'] = 'checkout';
            b['checkout_step'] = '4';
            break;
        case "POR":
            b['google_action'] = 'checkout';
            b['checkout_step'] = '5';
            break;
        }
        if (b.checkout_step === "1") {
            b.google_action = "checkout";
        }
    }
}

} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
//method for setting search values for searches initiated Externally
utag.setupExternalSearch = function(se) {
    // To be consistent with internal search, only count searches if part_search_term has a value.
    if (b['part_search_term'] !== "") {
        b['external_search'] = '1';
        b['current_search_engine'] = se;
        b['google_pages'] = b['google_pages'].concat(deliniator,'Init_Srch=',b['part_search_term']);
    }
}

utag.clearSearchTags = function() {
        b['ref_part_search_term'] = b['part_search_term'] = '';
        b['ref_part_search_term_ext'] = b['part_search_term_ext'] = '';
        b['part_search_results_count'] = "";
        b['number_results_returned_from_search'] = 0;
        b['part_search_filter'] = "";    
}

if (a === 'view'){
    var deliniator = '?';
    b['init_srch_count'] = 0;
    b['external_search'] = "";
    if (typeof b['part_search_term'] !== 'string') b['part_search_term'] = "";

    // Strip parameters from URI except for order confirmation
    // Retain query parameter only if Order Confirmation page
    b['google_pages'] = b['dom.pathname'];
    if (b['dom.pathname'].toString().toLowerCase() == '/ordering/submit'.toLowerCase()
      && b['dom.query_string'].toLowerCase().indexOf('submit') >= 0) {
        b['google_pages'] = b['google_pages'].concat(deliniator,'Submit=yes');
        deliniator = '&';
        b["ExtRun"] = utag.dkTrk('513.1');
    }
    
    // End Part Search refinement if the visitor Navigates out of search
    if (b['ref_page_event'] === 'Header Nav') {
        utag.clearSearchTags();
        b["ExtRun"] = utag.dkTrk('513.2');
    }

    if (b['page_type'] == 'PS')
    {   
        // Try to set part_search_term if not present
        if (!('part_search_term' in b) || b['part_search_term'] === "") {
            if ('meta.no_result_search_term' in b){
               b['part_search_term'] = b['meta.no_result_search_term'];
               b["ExtRun"] = utag.dkTrk('513.2');
            } else if ('ref_part_search_term' in b && b['ref_part_search_term'] !== '') {
                b['part_search_term'] = b['ref_part_search_term'];
                b["ExtRun"] = utag.dkTrk('513.2');
            } else if ('qp.pkeyword' in b || 'qp.keywords' in b || 'qp.k' in b) {
                b['part_search_term'] = b['qp.keywords'] || b['qp.k'] ||b['qp.pkeyword'];
                b["ExtRun"] = utag.dkTrk('513.2');
            } else {
                b['part_search_term'] = "";
                b["ExtRun"] = utag.dkTrk('513.3');
            }
        }
        // If the user enters a term in the Refine Search field the site will treat it as an initial search.
        if (b['ref_page_event'] === 'Search Within Results' && b['ref_page_search_term']) {
            b['ref_page_event'] = 'Initiate Search';
        }
        
        // Set Initiate Search values
        if (b['ref_page_event'] === 'Initiate Search') {
            if (b['part_search_term'] !== "") {
                b['google_pages'] = b['google_pages'].concat(deliniator,'Init_Srch=',b['part_search_term']);
                b['init_srch_count'] = 1;
                b['external_search'] = "0";
                deliniator = '&';
                if ('part_search_filter' in b && b['part_search_filter'].toLowerCase() !== 'no filter'
                    && b['part_search_filter'] !== "") {
                   b['google_pages'] = b['google_pages'].concat(deliniator,'Ref_Srch=',b['part_search_filter']); 
                }
            } else {
                //handle case where this is no search term for Initiate Search
                utag.dkErrorTag("Initiate Search with no Search Term - ext 513");
            }
        } else if ('dom.referrer' in b && b['part_search_term'] !== "") {
            // handle the case where the search was initiated externally
            if (b['dom.referrer'].toLowerCase().includes("google")) {
                utag.setupExternalSearch("google");
            }
            else if (b['dom.referrer'].toLowerCase().includes("bing")) {
                utag.setupExternalSearch("bing");
            }
            else if (b['dom.referrer'].toLowerCase().includes("yahoo")) {
                utag.setupExternalSearch("Yahoo");
            }
        }
        
        //Remove Part Search Term from searches initiated from code on Digikey pages.  The
        //test for ref_page_type is empty is to catch the case where the user does a page
        //refreash.
        if ((b['ref_page_type'] !== 'PS' && b['ref_page_type'] !== '') 
            && b['google_pages'].indexOf("Init_Srch=") < 0) {
            utag.clearSearchTags();
        }
            
        // Set values for Page Sub Types.  Can be removed for Search 2.0
        if (b['page_sub_type'] == 'NR') {
            b['part_search_results_count'] = '0';
            b["ExtRun"] = utag.dkTrk('263.1');
        } 
        
        // in Search 2.0, the part_search_results_count is returning the total number of 
        // parts returned for a search.  For now, convert to cornerstone values
        if ('part_search_results_count' in b && b['part_search_results_count'] !== "") {
            b['number_results_returned_from_search'] = b['part_search_results_count'];
            b['part_search_results_count'] = (b['part_search_results_count'] === '0') ? "0" : "1"
        }
    }
}

// Expand Title for Help pages to include the specific title of the Help Topic
if (b['dom.pathname'].toString().toLowerCase() == '/classic/help.aspx'
    && b['dom.query_string'].toLowerCase().includes('id=')) {
    if (b['dom.query_string'].includes('&')) {
        b['page_title'] = b['dom.query_string'].substring(b['dom.query_string'].indexOf('id=')+3,b['dom.query_string'].indexOf('&')).replace(/%20/g," ");
    } else {
        b['page_title'] = b['dom.query_string'].substring(b['dom.query_string'].indexOf('id=')+3).replace(/%20/g," ");
    }
    b["ExtRun"] = utag.dkTrk('263.5');
}

  
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
if (a == 'link' && typeof b['merch_id'] != 'undefined' && b['ref_page_event'] == 'Impression') {
    b['event_category'] = 'Merchandising';
    b['event_action'] = 'Impression';
    b.page_type = utag.data.page_type;
    b.page_sub_type = utag.data.page_sub_type;
    b.page_id = utag.data.page_id;
  if (typeof b['event_uri'] != 'undefined') {b['google_pages'] = b['event_uri'];}
    b['promo_id'] = [b['merch_id']];
    b['promo_creative'] = ['Add Ad Name to Tag'];
  switch (b['ref_page_type']){
      case 'HP':
	  b['promo_position'] = ['Homepage Carousel'];
	  break;
	case 'SP':
	  b['promo_position'] = ['Part Search'];
	  break;
        case 'FS':
	  b['promo_position'] = ['Newest Products'];
	  break;
        default:
	  b['promo_position'] = ['Unknown'];
	  break;
      }
 }


    
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
if (a == 'view' && typeof b['merch_id'] != 'undefined' 
    && (b['ref_page_event'] == 'Click' || b['ref_page_event'] == 'Supplier Promo Click')) {
    b['event_category'] = 'Merchandising';
    b['event_action'] = 'Click';
    b['google_action'] = 'promo_click';
    b['promo_id'] = [b['merch_id']];
    b['promo_creative'] = ['Add Ad Name to Tag'];
  switch (b['ref_page_type']){
      case 'HP':
	  data['promo_position'] = ['Homepage Carousel'];
	  break;
	case 'SP':
	  data['promo_position'] = ['Part Search'];
	  break;
        case 'FS':
	  data['promo_position'] = ['Newest Products'];
	  break;
        default:
	  data['promo_position'] = ['Unknown'];
	  break;
      }
 }


    
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if((b['page_type']=='Ordering'&&b['page_title']=='Add Part')){b['pre_order_id']=b['order_weborder_number']} } catch(e){ utag.DB(e); }  },
function(a,b){ try{ if(1){
var unwantedEvents = 'Select Part, Part Search Event, Select Family, Initiate Search, Order Link Click, Design Link Click, Research Link Click, Same Day Shipping';
if (b['ref_page_event'] != 'Click' && unwantedEvents.includes(b['ref_page_event'])){
  b["ExtRun"] = utag.dkTrk('285.1');
  b['merch_id'] = (function(){return;})();
  b['merch_campaign'] = (function(){return;})();
  b['merch_placement'] = (function(){return;})();
  b['merch_target'] = (function(){return;})();
}
  
if (b.event_category == 'Personalization') {
    b.page_type = utag.data.page_type;
    b.page_sub_type = utag.data.page_sub_type;
    b.page_id = utag.data.page_id;
}


} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
if ((typeof b['qp.utm_source'] == 'undefined' || b['qp.utm_medium'] == 'undefined') && typeof b['qp.WT.z_cid'] != 'undefined') {
  if (b['qp.WT.z_cid'] !== 'Shared_Cart' && b['qp.WT.z_cid'] !== 'Uploaded_Cart') {
      b["ExtRun"] = utag.dkTrk('290');
    utag.InitWTCampaign(b);
  b['uses_new_google_campaigns'] = '1';
  b['campaign'] = '(Not Set)';
  b['campaign_content'] = '(Not Set)';
  b['campaign_source'] = (function(){return;})();
  b['campaign_medium'] = (function(){return;})();
  if (utag.data['page_site'] != 'undefined'){b['campaign_site'] = utag.data['page_site'];} else {b['campaign_site'] = '(Not Set)';}
  b['aggregator_or_supplier_campaign'] = b['qp.WT.z_cid'];
  var cid_part = b['qp.WT.z_cid'].split('_');
  if (cid_part[0] == 'ref') {
    b['campaign_medium']='aggregator';
    b['campaign'] = 'buynow';
    switch (cid_part[1]){
      case 'datasheetarchive30':
	b['campaign_source']='datasheetarchive';
	break;
      case 'neda':
	b['campaign_source'] = 'ecia';
	if (typeof cid_part[4] != 'undefined') {
	  b['campaign'] = cid_part[4];
	} 
	break;
	  case 'Octopartfastaddpost':
	  b['campaign_source'] = 'octopart';
	  b['campaign'] =  'bom';
	  break;
	    case 'findchips0311':
	b['campaign_source'] = 'findchips';
	  break;
      default:
	  b['campaign_source'] = cid_part[1];
	  if (typeof cid_part[2] != 'undefined') {
	      switch (cid_part[2]) {
		  case 'bnl':
		  case 'tl':
	          case 'eeboard':
	          case 'eefocus':
	             b['campaign'] = cid_part[2];
	             break;
		 default:
	             break;
	      }
	}
    }
  } else if (cid_part[0] == 'sp'){
    b['campaign_medium'] = 'supplier';
    b['campaign_source'] = cid_part[1];
    b['campaign_supplier'] = cid_part[1];
 // remove / or \ from string   
    cid_part[2] = cid_part[2].replace(/[\/|\\]/,""); 
    if (cid_part.length >= 4) {cid_part[3] = cid_part[3].replace(/[\/|\\]/,"");}
    cid_part[2] = cid_part[2].replace('site=us',"");
    if (cid_part[2] == 'supplier' || cid_part[3] == 'supplier') {
      b['campaign'] = 'disti';
    } else if (cid_part[2] == 'buynow' || cid_part[3] == 'buynow'){
      b['campaign'] = 'buynow';
    } else {
      switch (cid_part[2]) {
	case 'EM7455':
	case 'MC7455':
	  b['campaign'] = 'buynow';
	  break;
	default:
	  b['campaign'] = '(Not Set)';
      }
    }	
  }
}
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
// Removes duplicate transactions.  This can occur if the session has expired and the user returns to the Order Confirmation page.

// The code tests to see if the order was created using the Submit button on the Order Preview page.  If it was not, order data is undefined.
// A special case is for users that don't allow cookies.  In that case, transactions are never changed.  That will allow some duplicate
// transactions, but the number is to small to impact overall data.
if (typeof b['order_subtotal_in_usd'] != 'undefined' && b['order_id_on_confirmation_page'] != 'undefined') {
  if (b['mobile_site'] !== 'true') {
      b["ExtRun"] = utag.dkTrk('291.1');
    if (typeof b['ref_page_event'] == 'undefined' || b['ref_page_event'] != 'Submit Order') {
//      b['pre_order_id'] = b['order_id_on_confirmation_page'];
      b['order_subtotal_in_usd'] = (function(){return;})();
      b['order_id_on_confirmation_page'] = (function(){return;})();
      b['_corder'] = (function(){return;})();
      b['_ctotal'] = (function(){return;})();
     }
   } 
}

 if (typeof b['order_subtotal_in_usd'] != 'undefined') {
     b["ExtRun"] = utag.dkTrk('291.2');
   if (b['order_subtotal_in_usd']>=500000) {
      b['order_subtotal_in_usd'] = utag.data['order_subtotal_in_usd'] = 1;
      b['_ctotal'] = '1';
    }
 }

} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
// Set Registration Status to 1 if Customer ID or Registration ID is defined.
var element = document.getElementById('authControls');
b.registration_status = "";
if (b.page_type === 'SC' && (b.page_sub_type === 'SCAD' || b.page_sub_type === 'SI' || b.page_sub_type === 'BL')) 
{
    if (b["dom.pathname"].indexOf('/guest/') < 0) {
        b.registration_status = '1';
        b["ExtRun"] = utag.dkTrk('292.1');
    }
} else if (!element && (b.page_sub_type != 'POR' && !b.page_type.match(/RU|MK/))) {
    b.registration_status = "1";
    b["ExtRun"] = utag.dkTrk('292.2');
}


		     
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
if (b['dom.pathname'].includes('/number/') || b['dom.query_string'].includes('pv2078')){
  // this correction does not fix the referring page data for links from the page.  They are still 'FAM'
  b["ExtRun"] = utag.dkTrk('307.1');
  utag_data['page_sub_type'] = 'BFA';
  b['page_sub_type'] = utag_data['page_sub_type'];
  utag_data['detail_title'] = utag_data['dom.title'];
  b['detail_title'] = utag_data['detail_title'];
}
// this correction fixes the referring page data for links from the base part page.  We intentionally drop the
// pv2078 because the referring pages are not pure base part pages.
if (b['dom.referrer'].includes('/number/')){
    b["ExtRun"] = utag.dkTrk('307.2');
  b['ref_page_sub_type'] = 'BFA';
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
if (typeof b['ref_page_type'] == 'undefined' && typeof b['ref_page_event'] == 'undefined' 
    && b['add_part_method'] == 'Upload'){
        b["ExtRun"] = utag.dkTrk('308');
  b['ref_page_type']=utag_data['page_type'];
  b['ref_page_sub_type'] = utag_data['page_sub_type'];
  if (b['dom.referrer'].search(/\/BOM\/?/i) >=0){
    b['ref_page_id'] = 'MGR';
  } else {
    b['ref_page_id'] = b['page_id'];
  }
  b['ref_page_event'] = 'Add to BOM';
} 

} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if((typeof b['ref_page_event']!='undefined'&&b['ref_page_event'].toString().toLowerCase()=='get html datasheet'.toLowerCase())){b['asset_type']='HTML Datasheet'} } catch(e){ utag.DB(e); }  },
function(a,b){ try{ if(1){
if (b['page_type'] === 'ADI') {
    b["ExtRun"] = utag.dkTrk('310');
  b['page_content_group'] = 'Product Highlight';
  b['page_content_sub_group'] = 'Standard Template';
  b['supplier_id'] = '505';
  b['page_type'] = 'SP';
  b['page_sub_type'] = 'PH';
  b['ph_id'] = b['page_id'];
}
  
  
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
if (typeof optimizely != 'undefined' && optimizely.hasOwnProperty('get')) {
  var data = optimizely.get('data');
  b["ExtRun"] = utag.dkTrk('313');
  b['optimizelyExperiment']  = data['decision'];
}

} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
if (b['page_type'] === 'SC' && (b['page_sub_type'] === 'CO' || b['page_sub_type']==='SCAD')) {
    b["ExtRun"] = utag.dkTrk('321.1');
  if (b['page_sub_type'] === 'CO' && typeof b['ref_page_type'] == 'undefined' && typeof b['qp.WT.z_ref_page_type'] != 'undefined') {
       b['ref_page_type'] = b['qp.WT.z_ref_page_type'];
     b['ref_page_sub_type'] = b['qp.WT.z_ref_page_sub_type'];
     b['ref_page_id'] = decodeURIComponent(b['qp.WT.z_ref_page_id']);
     b['ref_page_event'] = decodeURIComponent(b['qp.WT.z_ref_page_event']);
} else if (b['page_sub_type'] === 'SCAD' && typeof b['ref_page_type'] == 'undefined' && b['dom.referrer'].indexOf('WT.z_re') > 0) {
    b["ExtRun"] = utag.dkTrk('321.2');
  var qpos = b['dom.referrer'].indexOf('?');
  var querystr = b['dom.referrer'].substr(qpos+1);
  var qparms = querystr.split('&');
  for (i = 0; i < qparms.length; i++) {
    var aparm = qparms[i].split('=');
    switch (aparm[0]){
      case 'WT.z_ref_page_type':
	b['ref_page_type'] = aparm[1];
	break;
	  case 'WT.z_ref_page_sub_type':
	b['ref_page_sub_type'] = aparm[1];
	break;
	  case 'WT.z_ref_page_id':
	b['ref_page_id'] = decodeURIComponent(aparm[1]);
	break;
	  case 'WT.z_ref_page_event':
	b['ref_page_event'] = decodeURIComponent(aparm[1]);
	break;
	  }
  }
}
	
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
if (typeof b['merch_target'] != 'undefined' && b['merch_target'].toUpperCase() == '{CDB2B146-A8E9-4338-B78A-19FD2FADBF80}') {
    b["ExtRun"] = utag.dkTrk('337');
  b['merch_placement'] = b['merch_placement'].replace('{{','{');
  b['merch_placement'] = b['merch_placement'].replace('}}','}');
  b['merch_id'] = b['merch_id'].toUpperCase();
  b['merch_target'] = b['merch_target'].toUpperCase();
  b['merch_placement'] = b['merch_placement'].toUpperCase();
}


} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
// extension 383
// Part Search will need to add ... to referring part data
if (a === 'view') {
    if (b['ref_page_type'] === 'PS' && b['ref_page_sub_type'] === 'PD' && b['ref_page_event'] === 'Add to Cart') {
        // if search2 ignore here.  It will use fastAdd
        if (b['ref_pers_state'].indexOf('"search2":"classic"')<0) {
            uframework = utag.framework || {};
            b["ExtRun"] = utag.dkTrk('383.1');
            var partDesc = {};
            partDesc['tealium_event'] = 'cart_add';
            partDesc['part_qty'] = b['ref_quantity_ordered'] || "(Not Set)";
            partDesc['part_id'] = b['ref_part_id'];
            partDesc['pn_sku'] = b['ref_part_id'];
            partDesc['supplier_id'] = b['ref_supplier_id'];
            partDesc['web_id'] = b['pre_order_id'];
            partDesc['part_description'] = b['ref_part_description'];
            partDesc['part_category'] = b['ref_category'];
            partDesc['stock_status'] = (b['ref_part_available'] !== '0') ? '1' : '0';
            partDesc['vendor_type'] = uframework.testForMerchandising(b['ref_supplier_id']);
            utag.dkPartActivity('cart_add',JSON.stringify(partDesc));
            utag.dkLastPart();
        }
    }
    
    // Part Search will need to add ... for when the part detail page is loaded
    if (b['page_type'] === 'PS' && b['page_sub_type'] === 'PD') {
    // This looks different than the above because the part list data has to be added to the page view.
        uframework = utag.framework || {};
        b["ExtRun"] = utag.dkTrk('383.2');
        var partDesc = {};
        b['tealium_event'] = 'product_view';
        b.part_id_a = [b['part_id']];
        b.part_sku_a = [b['part_id']];
        b.supplier_id_a = [b['supplier_id']];
        b.part_description_a = [b['part_description']];
        b.stock_status_a = [(b['part_available'] !== '0') ? '1' : '0'];
        b.part_type_a = [uframework.testForMerchandising(b['supplier_id']) || 'Digi-Key'];
    }
}

} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
if (b['dom.pathname'].indexOf('maker/blog') > 0 || b['dom.pathname'].indexOf('maker/video') > 0 || b['dom.pathname'].indexOf('maker/platforms') > 0
   || b['dom.pathname'].indexOf('maker/interview') > 0) {
       b["ExtRun"] = utag.dkTrk('388.1');
  if (typeof b['page_type'] == 'undefined') { // check if fix is inplace
    utag.dkTrk('388.1');
    b['page_content_group'] = 'Maker';
    b['page_content_sub_group'] = 'Post';
    b['page_type'] = 'MK';
    b['page_sub_type'] = 'PST'; 
    }
}

if (b['dom.pathname'].indexOf('maker/profiles') > 0) {
    b["ExtRun"] = utag.dkTrk('388.2');
  if (typeof b['page_type'] == 'undefined') { // check if fix is inplace
    utag.dkTrk('388.2');
    b['page_content_group'] = 'Maker';
    b['page_content_sub_group'] = 'Logged In User';
    b['page_type'] = 'MK';
    b['page_sub_type'] = 'EPF';
    }
}  


} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
// extract user and customer id from cookie
if (typeof utag.data['cp.tagxi'] != 'undefined') {
    var userIDs = [];
    userIDs = utag.data['cp.tagxi'].split('.');
    utag.data['google_user_id'] = userIDs[0];
    b["ExtRun"] = utag.dkTrk('391.1');
    b['google_user_id'] = userIDs[0];
    if (userIDs.length > 1){
        utag.data['google_cust_id'] = userIDs[1];
        b['google_cust_id'] = userIDs[1]; 
    }
}


try {
var cookie_changed = false;
if (b.hasOwnProperty('campaign_customer_id')) {
    // this should be overridden by any other customer id and should not be persisted
    b.google_cust_id = b.campaign_customer_id;
    b.ExtRun = utag.dkTrk['391.3'];
}

if (b.hasOwnProperty('registered_user_id') && b.registered_user_id !== '0') {
    if (b.google_user_id !== b.registered_user_id) { 
        b.google_user_id = b.registered_user_id;
        cookie_changed = true;
    }
}

if (b.hasOwnProperty('customer_id') && b.customer_id !== '0') {
    if (b.google_cust_id !== b.customer_id) {
        b.google_cust_id = b.customer_id;
        cookie_changed = true;
    }
}

if (cookie_changed) {
    d.setTime(d.getTime() + (360 * 24 * 60 * 60 * 1000));
    cookie_value = b.google_user_id+"."+b.customer_id;
    document.cookie = 'tagxi=' + cookie_value + ';expires=' + d.toUTCString() + ';path=/';
    utag.data['cp.tagxi'] = cookie_value;
    b.ExtRun = utag.dkTrk['391.4'];
}

if (b.ref_page_event === 'Log Out' || b.google_user_id === '0') {
    document.cookie = "tagxi=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    b['cp.tagxi'] = utag.data['cp.tagxi'] = "";
    b.ExtRun = utag.dkTrk['391.5'];
} 
    
} catch (err) {
    var errData = {},data={};
    data['ExtRun'] = utag.dkTrk('391-e');
    utag.dkErrorTag(data,err.name,err.message);
}




} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
// The initial referring page event is correct, but subsiqent referring page events are overridden by 'Unknown Event'
if (b['ref_page_event'] == 'Unknown Event' && typeof b['meta.ref_page_event'] != 'undefined') {
    b["ExtRun"] = utag.dkTrk('395');
    b['ref_page_event'] = b['meta.ref_page_event'];
    b['ref_page_type'] = b['meta.ref_page_type'];
    b['ref_page_sub_type'] = b['meta.ref_page_sub_type'];
    b['ref_page_id'] = b['meta.ref_page_id'];
    utag.dkTrk('395'); 
}
if (a === 'view' && b.ref_page_event === 'Search Video Library') b.content_search_keywords = b['qp.t'];
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
if (b.ref_page_event === 'Mobile Nav Link') {
    b.ref_page_event = 'Header Nav';
    b.ExtRun = utag.dkTrk('399.1');
}
if (b.ref_page_event === 'Header Hav') {
    b.ref_page_event = 'Header Nav';
    b.ExtRun = utag.dkTrk('399.2');
}
if (b.ref_page_event === 'Design Link Click') {
    b.ref_page_event = 'Header Nav';
    b.ExtRun = utag.dkTrk('399.3');
}
if (b.ref_page_event === 'Ordering Link Click') {
    b.ref_page_event = 'Header Nav';
    b.ExtRun = utag.dkTrk('399.4');
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
if (b.ref_page_type === 'HP') {
    if (b.event_category === 'Merchandising' && (b.event_action !== 'Impression' && b.event_action !== 'Click')) {
        b.ref_page_event = b.event_action = 'Impression';
        b.ExtRun = utag.dkTrk('402'); 
    }
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
if (a === 'view') {
if (typeof b.page_type == 'undefined') {
    b.ExtRun = utag.dkTrk('406.1');
    b.page_type = utag.data['page_type'] || utag_data['page_type'] || "";
    }
if (typeof b.page_sub_type == 'undefined') {
    b.ExtRun = utag.dkTrk('406.1');
    b.page_sub_type = utag.data['page_sub_type'] || utag_data['page_sub_type'] || "";
    }
if (typeof b.page_id == 'undefined') {
    b.ExtRun = utag.dkTrk('406.1');
    b.page_id = utag.data['page_id'] || utag_data['page_id'] || "";
    }
if (typeof b.page_content_group == 'undefined') {
    b.ExtRun = utag.dkTrk('406.1');
    b.page_content_group = utag.data['page_content_group'] || utag_data['page_content_group'] || "";
}
if (typeof b.page_content_sub_group == 'undefined') {
    b.ExtRun = utag.dkTrk('406.1');
    b.page_content_sub_group = utag.data['page_content_sub_group'] || utag_data['page_content_sub_group'] || "";
}
if (typeof b.ref_page_event != 'undefined' && typeof b.ref_page_type == 'undefined') {
    b.ExtRun = utag.dkTrk('406.2');
    b.ref_page_type = b.page_type;
    b.ref_page_sub_type = b.page_sub_type;
    b.ref_page_id = b.page_id;
    }
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
if (b.page_type === 'DYC' && b.page_sub_type === 'SR') {
    if (typeof b.selected_suppliers != 'undefined' && typeof b.ref_page_event == 'undefined') {
        b.ExtRun = utag.dkTrk('407');
        b.ref_page_event = 'Filter on Supplier';
        b.ref_page_type = b.page_type;
        b.ref_page_sub_type = b.page_sub_type;
        b.ref_page_id = b.page_id;
    }
}

if (b.page_type === 'MK' && b.ref_page_event === 'Initiate Search') {
    b.ref_page_event = 'Maker Search';
    b.ExtRun = utag.dkTrk('407.2')
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
// 431
utag.setFilter = function(partSearchFilter,sParam,value){
    if (b[sParam] === "") return partSearchFilter;
    var del = (typeof partSearchFilter === 'undefined' || partSearchFilter === "") ? '' : ',';
    return partSearchFilter += (typeof b[sParam] !== 'undefined') ? del + value : "";
};

if (b.page_type === 'PS') {
    if (b.part_search_filter === 'No Filter') {b.part_search_filter = "";}
    var partSearchFilter = b.part_search_filter || "";
    // For Search 1.0.  Remove when search 2.0 is complete
    if (b.page_sub_type === 'NR' || b.page_sub_type === 'PD'|| b.page_sub_type === 'FAM') {
        partSearchFilter = utag.setFilter(partSearchFilter,'qp.nstock','Not Stocked');
        partSearchFilter = utag.setFilter(partSearchFilter,'qp.stock','Stocked');
        partSearchFilter = utag.setFilter(partSearchFilter,'qp.newproducts','New Products');
        partSearchFilter = utag.setFilter(partSearchFilter,'qp.datasheet','Datasheet');
        partSearchFilter = utag.setFilter(partSearchFilter,'qp.photo','Photos');
        partSearchFilter = utag.setFilter(partSearchFilter,'qp.rohs','RoHS Compliant');
        partSearchFilter = utag.setFilter(partSearchFilter,'qp.nonrohs','Non-RoHS Compliant');
        partSearchFilter = utag.setFilter(partSearchFilter,'qp.excludemarketplace','Exclude Marketplace');
        b.part_search_filter = (partSearchFilter === '') ? 'No Filter' : partSearchFilter;
        b.ExtRun = utag.dkTrk('431.1');
    } else {
        partSearchFilter = utag.setFilter(partSearchFilter,'qp.v','Vendor');
        partSearchFilter = utag.setFilter(partSearchFilter,'qp.excludemarketplace','Exclude Marketplace');
        b.part_search_filter = (partSearchFilter === '') ? 'No Filter' : partSearchFilter;
        b.ExtRun = utag.dkTrk('431.1'); 
    }
    if (typeof b['qp.v'] !== 'undefined' && b['qp.v'].length > 0) {
        b.supplier_id = b['qp.v'];
    }
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
if (a === 'view') {
    if (b.ref_page_type === 'RU' && b.ref_page_sub_type === 'LOG' && b.ref_page_id === 'Standard Login') {
        if (b.page_type === 'RU' && b.ref_page_event === 'Successful Login') {
            if (b.page_sub_type === 'LOG') {
                b.ref_page_event = 'Login Failed';
                b.ExtRun = utag.dkTrk('441.1');
            } else if (b.page_sub_type === 'RUM') {
                b.ref_page_event = 'Successful Login - New Password Required';
                b.ExtRun = utag.dkTrk('441.4');
            }
        }
    }

    if (b.ref_page_event === 'Header Nav' && b.html_element1 === 'primary dropdown--button' && b.html_element2 === 'authControls') {
        if (b.page_type !== 'RU' && b.page_sub_type !== 'LOG') {
            b.ref_page_event = 'Header Nav - Successful Login';
            b.ExtRun = utag.dkTrk('441.2');
        }
    }
    
    if (b.ref_page_type === 'RU' && b.ref_page_sub_type === 'RUM' && b.ref_page_id === 'Change Password') {
        if (b.page_type === 'RU' && b.page_sub_type === 'RUM' && b.ref_page_event === 'Change Password') {
            b.ref_page_event = 'Change Password Failed';
            b.ExtRun = utag.dkTrk('441.3');
        }
    }


}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
if (a === 'view') {
    utag.checkForEvergage = function() {
        var i, perData = {}, evergageID;
        var evergageElements = document.getElementsByClassName('evergage-tooltip');
        if (typeof evergageElements !== 'undefined') {
            for (i=0; i < evergageElements.length; i++) {
                evergageID = evergageElements[i].id;
                if (evergageID !== "" && evergageID.indexOf('m8NwK') < 0) {
                    perData.evergageID = evergageID.substr(-5);
                    utag.framework.lookupForEvergage(perData);
                    if (perData.hasOwnProperty('personalization_program')) {
                        perData.ref_page_event = "Impression";
                        perData.event_category = 'Personalization';
                        perData.event_label = 'Evergage';
                        if (perData.personalization_program.match(/Supplier Cookie/i)) {
                            utag.dkSaveSupplierCookieRules(perData);
                        } else {
                            utag.dklink(perData);
                        }
                    }
                }
            } 
        }
    }
    
    setTimeout(function(){utag.checkForEvergage()},500);
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
 if (typeof b['qp.gclid'] != 'undefined'
     && !b['dom.referrer'].includes('digikey')
     )
     {
    b["ExtRun"] = utag.dkTrk('453.1');         
   utag.InitWTCampaign(b);
  b['is_paid_search'] = '1';
  b['campaign_medium'] = 'cpc';
   b['uses_new_google_campaigns'] = '1';
} else if (typeof b['qp.dclid'] != 'undefined') {
    b["ExtRun"] = utag.dkTrk('453.2');
   utag.InitWTCampaign(b);
    b['is_doubleclick_ad'] = '1';
    b['uses_new_google_campaigns'] = '1';
} else if (typeof b['qp.utm_source'] == 'undefined' || typeof b['qp.utm_medium'] == 'undefined') {
  if (typeof b['campaign_source'] != 'undefined') {
      b["ExtRun"] = utag.dkTrk('453.3');
    // campaign_site will always have a value, including (Not Set)
    if (typeof b['campaign_site'] == 'undefined') {b['campaign_site'] = utag.data['page_site'];} 
    if (typeof b['campaign_supplier'] == 'undefined') {
      if (typeof utag.data['supplier_id'] != 'undefined') {
	b['campaign_supplier'] = utag.data['supplier_id'];
      } else {
	b['campaign_supplier'] = '(Not Set)';
      }
    }
  }
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
utag.shoppingCartNameKeypress = function(a,b,c,d,e) {
    var enterKeyPressed = false;
    if (a.key === 'Enter') {enterKeyPressed = true;}
    else if (a.keyCode === 13) {enterKeyPressed = true;}
    if (!enterKeyPressed) return;

    utag.dkTrk('461.1');
    utag.dkLink('ref_page_event=Name Cart');
}

if (b.page_type==='SC' && b.page_sub_type === 'CO') {
    var element = document.getElementById('CartName');
    if (element){
    utag.loader.EV(element,'keydown',utag.shoppingCartNameKeypress);
    }
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
if (a==='view') {
    b.vendor_type = utag.framework['testForMerchandising'](b['supplier_id']) || 'Digi-Key';
    if (typeof b.page_state === 'string') {
        b.page_state = b.page_state.replace('Marketplace Vendor','Includes Marketplace Parts');
    }
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
utag.elementIdTable = {};
utag.elementIdTable['valueAddNotAvailableMsg'] = ['Value Add Packaging not Available - Alternate packaging exists'];
//utag.elementIdTable['nonStockMsg'] = ['Non-Stock Part'];
utag.elementIdTable['endOfLifeDateMsg'] = ['End of Life'];
utag.elementIdTable['notRecommendedNewDesignMsg'] = ['Not Recommended for New Design'];
utag.elementIdTable['obsoleteStockLimitedQtyMsg'] = ['Obsolete Part'];
utag.elementIdTable['partNotReleasedMsg'] = ['Part Not Released'];
utag.elementIdTable['noBoMsg'] = ['Constrained Supply'];

if (a === 'view') {
    if (utag.dkConCatPageType() === 'PS-PD') {
        var messageElm = document.getElementsByClassName('product-details-feedback');
        var i,j,liElement,elementID;
        for (i = 0; i<messageElm.length; i++) {
            liElement = messageElm[i].getElementsByTagName('LI');
            for (j=0; j<liElement.length;j++) {
                elementID = liElement[j].id;
                utag.elementIdTable.hasOwnProperty(elementID) ? utag.addPageState(utag.elementIdTable[elementID],b) : utag.addPageState(elementID,b);
            }
        }
        var helpElements = document.getElementsByClassName('help-icon-link'), i = 0,attr;
        for (i; i < helpElements.length;i++) {
            if ('href' in helpElements[i] && helpElements[i].href.match(/non-stock/i)){
                utag.addPageState('Non-Stock Part',b);
            }
        }
    }
}


} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){


if (a === 'view') {
    if (typeof b.google_user_id != 'undefined' && b.google_user_id != 'undefined') utag.data["is_user"] = 'true';
  if (typeof b.google_cust_id != 'undefined' && b.google_cust_id!== '0') utag.data['is_customer'] = 'true';
}


} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
if (a === 'view') {
    if (b.page_type === 'SC' && (b.page_sub_type === 'CO' || b.page_sub_type === 'SCN')) {
        if (typeof utag.data['partlist_callback'] === 'function') {
            setTimeout(utag.data['partlist_callback'],500);
            utag.DB("Set Part List Callback");
//            utag.data['partlist_callback']();
        }
    }
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
/*
 *Name: Google Analytics CS Integration
 *Version: 1.3 (Tealium + csMatchingKey)
 */

(function () {

    function callback() {
        if (!disableCallback) {
            disableCallback = true;

            if (window.CS_CONF) {
                CS_CONF.integrations = CS_CONF.integrations || [];
                CS_CONF.integrations.push("Google Analytics");
            }
        }
    }

    var disableCallback = false;

    window._uxa = window._uxa || [];
    _uxa.push(["afterPageView", callback]);

    if (b["cp._cs_mk"] && b["cp._cs_id"]) {
        b.cs_matching_key = b["cp._cs_mk"];
        return;
    }

    function init(cookieValue) {
        var cmk = Math.random() + "_" + Date.now();

        if (cookieValue) {
            cmk = cookieValue;
        }

        b.cs_matching_key = cmk;

        var now = new Date();
        var time = now.getTime();
        time += 30 * 60 * 1000;
        now.setTime(time);

        document.cookie = "_cs_mk=" + cmk + "; expires=" + now.toUTCString() + ";path=/;domain=." + utag.cfg.domain;

        _uxa.push(["trackDynamicVariable", {
            key: "csMatchingKey",
            value: cmk
        }]);
    }

    if (!b["cp._cs_mk"]) {
        init();
    } else {
        var getCookieValue = b["cp._cs_mk"];
        init(getCookieValue);
    }

})();
//Google Analytics CS Integration End
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
if (a === 'view') {
        var state = {};
        if (b.page_type === 'PS') {
            if (!('personalization_state' in b)) {
                state = {search2 : "not active"};
            }
        
            else {
                state = (typeof b.personalization_state === 'string') ? JSON.parse(b.personalization_state) : b.personalization_state;
                if (!("search2" in state)) {
                    state.search2 = "not active";
                } 
            }
            b.personalization_state = utag.data['personalization_state'] = JSON.stringify(state);
        }
}
} } catch(e){ utag.DB(e) }  },
function(a,b){ try{ if(1){
// extension 520
if (a = 'view') {
    if (typeof b.personalization_state === 'string' && b.personalization_state.indexOf('"search2":"classic"') >= 0){
    if (b.page_type = 'PS') {
            switch (b.page_sub_type) {
                case 'CAT':
                    b.page_content_sub_group = 'Keyword Search';
                    break;
                case 'PCAT':
                    b.page_content_sub_group = 'Keyword Search';
                    break;
                case 'SR':
                    b.page_content_sub_group = 'Category Page';
                    break;
                case 'FAM':
                    b.page_content_sub_group = 'Category Page';
                    break;
                case 'PD':
                    b.page_content_sub_group = 'Part Detail';
                    break; 
            }
            utag.data['page_content_sub_group'] = b.page_content_sub_group;
        }
    }
}
} } catch(e){ utag.DB(e) }  }];

    u.send = function(a, b) {
      if (u.ev[a] || u.ev.all !== undefined) {
        //##UTENABLEDEBUG##utag.DB("send:##UTID##");
        u.o = window[window.GoogleAnalyticsObject];
        b.ga_events = b.ga_events || []; // this has been superseded by u.data.ga_events. keeping for backward compatibility.
        var c, d, e, f, g, h, tn, prop;

        if (u.data && u.data.name) {
          tn = u.data.name;
        }

        u.data = {
          "qsp_delim": "&",
          "kvp_delim": "=",
          "base_url": "",
          "a": a,
          "cookieDomain": "" || utag.loader.lh(),
          "name": tn || "Dynamic Assignment Failed",
          "account": "",
          "anonymizeIp": "false",
          "allowLinker": "true",
          "crossDomainTrack": "www.digikey.co.za,www.digikey.cn,www.digikey.com.cn,www.digikey.hk,www.digikey.in,www.digikey.jp,www.digikey.my,www.digikey.ph,www.digikey.sg,www.digikey.kr,www.digikey.tw,www.digikey.co.th,www.digikey.com.au,www.digikey.co.nz,www.digikey.at,www.digikey.be,www.digikey.bg,www.digikey.cz,www.digikey.dk,www.digikey.ee,www.digikey.fi,www.digikey.fr,www.digikey.de,www.digikey.gr,www.digikey.hu,www.digikey.ie,www.digikey.it,www.digikey.lv,www.digikey.lt,www.digikey.lu,www.digikey.nl,www.digikey.no,www.digikey.pl,www.digikey.pt,www.digikey.ro,www.digikey.sk,www.digikey.si,www.digikey.es,www.digikey.se,www.digikey.ch,www.digikey.co.uk,www.digikey.co.il,digikeytest.digikey.ca,digikeytest.digikey.com,www.digikey.com,www.digikey.ca,www.digikey.com.mx",
          "enhancedLinkAttribution": "false",
          "enhancedecommerce": "true",
          "displayfeatures": "false",
          "screenView": "false",
          "optimizely": "true",
          "init_before_extensions": "true",
          "autofill_params": "false",
          "autosend_events": "true" || "true",
          "clear_global_vars" : "false",
          // Enhanced E-Commerce
          "enh_action": "",
          "enh_event_cb": "",
          "enh_checkout_step": "",
          "enh_checkout_option": "",
          "product_action_list": "",
          "product_variant": [],
          "enh_impression_id": [],
          "enh_impression_name": [],
          "enh_impression_price": [],
          "enh_impression_category": [],
          "enh_impression_brand": [],
          "enh_impression_variant": [],
          "enh_impression_list": [],
          "enh_impression_position": [],
          "enh_promo_id": [],
          "enh_promo_name": [],
          "enh_promo_creative": [],
          "enh_promo_position": [],
          // E-Commerce Vars
          "id": "",
          "product_id": [],
          "product_name": [],
          "product_brand": [],
          "product_category": [],
          "product_quantity": [],
          "product_unit_price": [],
          "product_discount": [],
          "product_position": [],
          "ga_events": [],
          "sessionControl": "",
          "set": {}
        };

         if (u.data.init_before_extensions === "true") {
	  if (typeof b.google_tracking_id === 'string') b.google_tracking_id = utag.data.google_tracking_id = [b.google_tracking_id];
	  if (typeof b.Google_tracking_name === 'string') b.Google_tracking_name = utag.data.Google_tracking_name =[b.Google_tracking_name];
	  u.data.account = b.google_tracking_id;
	  u.data.name = b.Google_tracking_name;
	  if (typeof u.data.account === 'undefined') { u.data.account = utag.data.google_tracking_id; }
	  if (typeof u.data.name === 'undefined') { u.data.name = utag.data.Google_tracking_name; }
	  u.createTracker();
          u.initTracker();
        }

        for(c=0;c<u.extend.length;c++){try{d=u.extend[c](a,b);if(d==false)return}catch(e){}};

        c = [];
        
        // Digikey customization
        u.data.repressPageview = b.repressPageview;
        // end

        // Start Mapping
        for (d in utag.loader.GV(u.map)) {
          if (b[d] !== undefined && b[d] !== "") {
            e = u.map[d].split(",");
            for (f = 0; f < e.length; f++) {
              if (e[f].indexOf("a.") === 0) {
                u.data["a"][e[f].substring(2)] = b[d];
              } else if (e[f].indexOf("set.") === 0) {
                  u.data.set[e[f].substring(4)] = b[d];
              } else {
                u.data[e[f]] = b[d];
              }
            }
          } else {
            h = d.split(":");
            if(h.length === 2 && b[h[0]] === h[1]){
              if(u.map[d]){
                u.data.enh_action = u.map[d];
              }
            }
          }
        }
        // End Mapping
        // handle mapped events. check b.ga_events for backward compatibility with the old template. new users should always use the mapping toolbox to set ga_events
        if (u.typeOf(u.data.ga_events) === "array" && u.typeOf(b.ga_events) === "array") {
          if (u.data.ga_events.length === 0 && b.ga_events.length > 0) {
            u.data.ga_events = b.ga_events;
          } else if (u.data.ga_events.length > 0 && b.ga_events.length > 0) {
            u.data.ga_events = u.data.ga_events.concat(b.ga_events); // if we have both ga_events AND u.data.ga_events, then join them together so we don't lose anything
          }
        }

        u.data.order_id = u.data.order_id || b._corder || "";
        u.data.order_total = u.data.order_total || b._ctotal || "";
        u.data.order_shipping = u.data.order_shipping || b._cship || "";
        u.data.order_tax = u.data.order_tax || b._ctax || "";
        u.data.order_store = u.data.order_store || b._cstore || "";
        u.data.order_currency = u.data.order_currency || b._ccurrency || "";
        u.data.order_coupon_code = u.data.order_coupon_code || b._cpromo || "";
        if (u.data.product_id.length === 0 && b._cprod !== undefined) { u.data.product_id = b._cprod.slice(0); }
        if (u.data.product_name.length === 0 && b._cprodname !== undefined) { u.data.product_name = b._cprodname.slice(0); }
        if (u.data.product_brand.length === 0 && b._cbrand !== undefined) { u.data.product_brand = b._cbrand.slice(0); }
        if (u.data.product_category.length === 0 && b._ccat !== undefined) { u.data.product_category = b._ccat.slice(0); }
        if (u.data.product_quantity.length === 0 && b._cquan !== undefined) { u.data.product_quantity = b._cquan.slice(0); }
        if (u.data.product_unit_price.length === 0 && b._cprice !== undefined) { u.data.product_unit_price = b._cprice.slice(0); }
        if (u.data.product_discount.length === 0 && b._cpdisc !== undefined) { u.data.product_discount = b._cpdisc.slice(0); }

        if (u.data.init_before_extensions !== "true") {
          u.createTracker();
          u.initTracker();
        }

        if (u.data.enhancedecommerce === "true" && !u.required["ec"]) {
          u.required["ec"] = !0;
          u.all("require", "ec");
        }

        // mobile
        u.data.app_id = u.data.app_id || u.data.appId || b.app_id;
        u.data.app_name = u.data.app_name || u.data.appName || b.app_name;
        u.data.app_version = u.data.app_version || u.data.appVersion || b.app_version;
        u.data.app_rdns = u.data.app_rdns || u.data.appInstallerId || b.app_rdns;
        u.data.screen_title = u.data.screen_title || u.data.screenName || b.screen_title;

        //changed to allow app information to be sent on events and page views
        if (u.data.app_id || u.data.app_name) {
          g = {};
          g.appName = u.data.app_name;
          g.appId = u.data.app_id || "";
          g.appVersion = u.data.app_version;
          g.appInstallerId = u.data.app_rdns;
          u.all("set", g);
        }

        //Moved out of screenview block as valid for all types
        u.data.exception_reason = u.data.exception_reason || b.exception_reason;
        if (u.data.exception_reason) {
          g = {};
          g.exDescription = u.data.exception_reason;
          g.exFatal = true;
          u.all("send", "exception", g);
        }

        if (u.data.allowLinker === "true" || u.data.allowLinker === true ) {
          if (!u.required["linker"]) {
            u.all("require", "linker");
            u.required["linker"] = !0;
          }

          if (u.data.crossDomainTrack) {
            if (u.typeOf(u.data.crossDomainTrack) === "string") {
              u.data.crossDomainTrack = u.data.crossDomainTrack.replace(/\s/g, '').split(',');
            }
            u.all("linker:autoLink", u.data.crossDomainTrack);
          }
        }

        // clear globally set vars 
        if (u.data.clear_global_vars === "true") {
          u.setGlobalProperties(u.data, true);  
          // clear custom vars set via "set.xxx"
          for (prop in utag.loader.GV(u.data.set)) {
            u.setGlobalProperties(u.data, true, prop);
          }
        }
        // now set the global properties with what's been passed into this utag.view/link hit
        u.setGlobalProperties(u.data, false);

        if (u.data.anonymizeIp === "true" || u.data.anonymizeIp === true ) {u.all("set", 'anonymizeIp', true);}
        if (u.data.uid) {u.all("set", "&uid", u.data.uid);}
        if (u.data.page) {u.all("set", "page", u.data.page);}
        if (u.data.title) {u.all("set", "title", u.data.title);}
        if (u.data.location) {u.all("set", "location", u.data.location);}
        if (u.data.campaignId) {u.all("set", "campaignId", u.data.campaignId);}
        if (u.data.campaignName) {u.all("set", "campaignName", u.data.campaignName);}
        if (u.data.campaignSource) {u.all("set", "campaignSource", u.data.campaignSource);}
        if (u.data.campaignMedium) {u.all("set", "campaignMedium", u.data.campaignMedium);}
        if (u.data.campaignContent) {u.all("set", "campaignContent", u.data.campaignContent);}
        if (u.data.campaignKeyword) {u.all("set", "campaignKeyword", u.data.campaignKeyword);}
        if (u.data.displayfeatures === "true" || u.data.displayfeatures === true) {
          if (!u.required["displayfeatures"]) {
            u.required["displayfeatures"] = !0;
            u.all("require", "displayfeatures");
          }
        }
        if (u.data.dataSource) {u.all("set", "dataSource", u.data.dataSource);}
        for (prop in utag.loader.GV(u.data.set)) {
          u.all("set", prop, u.data.set[prop]);
        }


        u.data.transaction_events = {};
        u.data.pageview_events = {};
        u.data.link_events = {};
        u.data.enhecom_events = {};
        for (d in utag.loader.GV(u.data)) {
          if (d.indexOf("-") > -1 && (d.indexOf("metric") > -1 || d.indexOf("dimension") > -1 || d.indexOf("contentGroup") > -1)) {
            //new functionality to accept different mapping types
            //u.all("set", d, u[d]);
            if (d.indexOf("transaction-") === 0) {
              u.data.transaction_events[d] = u.data[d];
            } else if (d.indexOf("pageview-") === 0) {
              u.data.pageview_events[d] = u.data[d];
            } else if (d.indexOf("link-") === 0) {
              u.data.link_events[d] = u.data[d];
            } else if (u.data.enhancedecommerce === "true" && d.indexOf("enh_") === 0) {
              u.data.enhecom_events[d] = u.data[d];
            }
          } else if (d.indexOf("metric") === 0 || d.indexOf("dimension") === 0 || d.indexOf("contentGroup") === 0) {
            //old functionality
            u.all("set", d, u.data[d]);
          }
        }

        // Enhanced Link Attribution
        if (u.data.enhancedLinkAttribution === "true") {
          if (!u.required["enhancedLinkAttribution"]) {
            u.required["enhancedLinkAttribution"] = !0;
            u.all("require", "linkid", "linkid.js");
          }
        }

        u.data.order_id = (u.data.order_id ? u.data.order_id : u.data.id);

        //  begin Enhanced Ecommerce block
        if (u.data.enhancedecommerce === "true") {

          // set currency if mapped
          u.all("set", '&cu', (u.data.currency ? u.data.currency : u.data.order_currency));
          // ENH: REFUND start
          if (u.data.order_id && u.data.enh_action === "refund") {
            if (u.data.order_id instanceof Array && u.data.order_id.length > 0) {
              u.data.order_id = u.data.order_id[0];
            }
            for (f = 0; f < u.data.product_id.length; f++) {
              g = {};
              g.id = u.data.product_id[f];
              g.quantity = (u.data.product_quantity[f] ? u.data.product_quantity[f] : "1");
              u.setHitData(g, "enhecom_events", "product_refund", f);
              u.all('ec:addProduct', g);
            }

            g = {};
            g.id = u.data.order_id;
            u.setHitData(g, "enhecom_events", "refund");
            u.all('ec:setAction', 'refund', g);
            // ENH: REFUND end
          }
          //ENH: ORDER start
          else if (u.data.order_id) {
              if (u.data.order_id instanceof Array && u.data.order_id.length > 0) {
              u.data.order_id = u.data.order_id[0];
            }
//            Products are added in a separate event
            u.addproduct("product_purchase", u.data.product_id.length, false);
            g = {};
            g.id = u.data.order_id;
            g.affiliation = (u.data.affiliation ? u.data.affiliation : u.data.order_store);
            g.revenue = (u.data.revenue ? u.data.revenue : u.data.order_total);
            g.shipping = (u.data.shipping ? u.data.shipping : u.data.order_shipping);
            g.tax = (u.data.tax ? u.data.tax : u.data.order_tax);
            g.coupon = (u.data.coupon ? u.data.coupon : u.data.order_coupon_code);
            u.setHitData(g, "enhecom_events", "purchase");
            u.all('ec:setAction', 'purchase', g);

            // ENH: ORDER end
          }
          // ENH: PRODUCT CLICK start
          else if (u.data.enh_action === "product_click" && u.data.a === "link") {
            u.addproduct("product_click", 1, false);
            u.all('ec:setAction', 'click', {list: u.data.product_action_list});
            if (u.data.autosend_events === "true"){
              u.all('send', 'event', 'UX', 'click', 'Results', {'hitCallback': u.data.enh_event_cb});
            }
            // ENH: PRODUCT CLICK end
          }
          // ENH: DETAIL start
          else if (u.data.enh_action === "detail") {
            u.addproduct("detail", 1, false);
            g = {};
            u.setHitData(g,"list", u.data.product_action_list);
            u.all("ec:setAction", "detail");
            // ENH: DETAIL end
          }
          // ENH: PRODUCT ADD start
          else if (u.data.enh_action === "add") {
            u.addproduct("product_add", u.data.product_id.length, false);
            // does not support custom metrics and dimensions! (ref: https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#enhanced-ecomm)
            u.all('ec:setAction', 'add', {list: u.data.product_action_list});
            if (u.data.a === "link" && u.data.autosend_events === "true") {
              u.all('send', 'event', 'UX', 'click', 'add to cart', {'hitCallback': u.data.enh_event_cb});
            }
            // ENH: PRODUCT ADD end
          }
          // ENH: PRODUCT REMOVE start
          else if (u.data.enh_action === "remove") {
            u.addproduct("product_remove", u.data.product_id.length, false);
            // does not support custom metrics and dimensions! (ref: https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#enhanced-ecomm)
            u.all('ec:setAction', 'remove');
            if (u.data.a === "link" && u.data.autosend_events === "true") {
              u.all('send', 'event', 'UX', 'click', 'remove from cart', {'hitCallback': u.data.enh_event_cb});
            }
            // ENH: PRODUCT REMOVE end
          }
          // ENH: CHECKOUT start
          else if (u.data.enh_action === "checkout") {
            u.addproduct("product_checkout", u.data.product_id.length, false);
            g = {};
            // does not support custom metrics and dimensions! (ref: https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#enhanced-ecomm)
            g.step = u.data.enh_checkout_step || "1";
            g.option = u.data.enh_checkout_option;
            u.all('ec:setAction', u.data.enh_action, g);
           if (u.data.a === "link" && u.data.autosend_events === "true") {
              u.all('send', 'event', 'UX', 'click', 'checkouted parts');
	    }
 
            // ENH: CHECKOUT end
          }
          // ENH: CHECKOUT OPTION start
          if (u.data.enh_action === "checkout_option" && u.data.a === "link") {
            g = {};
            // does not support custom metrics and dimensions! (ref: https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#enhanced-ecomm)
            g.step = u.data.enh_checkout_step || "1";
            g.option = u.data.enh_checkout_option;
            u.all('ec:setAction', u.data.enh_action, g);
            if (u.data.autosend_events === "true") {
              u.all('send', 'event', 'Checkout', 'Option', {'hitCallback': u.data.enh_event_cb});
            }
            // ENH: CHECKOUT OPTION end
          }
          // ENH: ADD IMPRESSION start
          if (u.data.enh_impression_id) {
            u.addproduct("product_impression", u.data.enh_impression_id.length, true);
            // ENH: ADD IMPRESSION end
          }
          // ENH: ADD PROMO start
          // does not support custom metrics and dimensions! (ref: https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters#enhanced-ecomm)
          if (u.data.enh_promo_id) {
            // if you are sending a promo on a "link", you must make sure to send a GA event alongside it (i.e. map event_action and event_category)
            u.addpromo(u.data.enh_action, u.data.a);

            // ENH: ADD PROMO end
          }
          // ENH: SEND PAGEVIEW & ASSOCIATED EVENTS
          g = {};

          // Digi-Key customization -- Added ga_noview to suppress the Order Confirmation page view.  It is being explicity sent in the Tealium code for GA.
          // We can't use the standard utag_cfg_ovrd.noview here because we want to fire all tags except the ga tag normally.
          if (utag_cfg_ovrd.ga_noview !== true) {
            if (u.data.order_id) {
                u.setHitData(g, "transaction_events");
            }
          

            u.setHitData(g, "pageview_events");
          }


          //Session Control
          //Used to control the session duration. A value of 'start' forces a new session to start with this hit and 'end' forces the current session to end with this hit. All other values are ignored.
          if (u.data.sessionControl === "start" || u.data.sessionControl === "end"){
            g.sessionControl = u.data.sessionControl;
          }

          // Digi-Key customization -- Added ga_noview to suppress the Order Confirmation page view.  It is being explicity sent in the Tealium code for GA
          if (utag_cfg_ovrd.ga_noview !== true) {
            if (u.data.a === "view") {
                if (u.data.screenView === "true" || u.data.screenView === true) {
                    g.screenName = u.data.screen_title || "";
                    u.all("send", "screenview", g);
                } else {
                    g.hitType = "pageview";
                    u.all("send", g); // Send page view request
                }
            }
          }
          // end enhanced e-commerce block
        } else if (u.data.a === "view") {
          // begin standard page view block (enhanced e-commerce disabled)
          g = {};
          u.setHitData(g, "pageview_events");

          if (u.data.sessionControl === "start" || u.data.sessionControl === "end"){
            g.sessionControl = u.data.sessionControl;
          }

          if (u.data.screenView === "true" || u.data.screenView === true) {
            g.screenName = u.data.screen_title || "";
            u.all("send", "screenview", g);
          } else {
            g.hitType = "pageview";
            u.all("send", g); // Send page view request
          }

          if (u.data.order_id && !(u.data.order_id instanceof Array)) {
            if (!u.required["ecommerce"]) {
              u.required["ecommerce"] = !0;
              u.all("require", "ecommerce", "ecommerce.js");
            }
            g = {};
            u.setHitData(g, "transaction_events");
            g.id = u.data.order_id;
            g.affiliation = (u.data.affiliation ? u.data.affiliation : u.data.order_store);
            g.revenue = (u.data.revenue ? u.data.revenue : u.data.order_total);
            g.shipping = (u.data.shipping ? u.data.shipping : u.data.order_shipping);
            g.tax = (u.data.tax ? u.data.tax : u.data.order_tax);
            g.currency = (u.data.currency ? u.data.currency : u.data.order_currency);
            u.all('ecommerce:addTransaction', g);

            for (f = 0; f < u.data.product_id.length; f++) {
              g = {};
              g.id = u.data.order_id;
              g.sku = u.data.product_id[f];
              g.name = (u.data.product_name[f] ? u.data.product_name[f] : u.data.product_id[f]);
              g.category = (u.data.product_category[f] ? u.data.product_category[f] : "");
              g.price = (u.data.product_unit_price[f] ? u.data.product_unit_price[f] : "1.00");
              g.quantity = (u.data.product_quantity[f] ? u.data.product_quantity[f] : "1");
              u.setHitData(g, "transaction_events");
              u.all('ecommerce:addItem', g);
            }
            u.all('ecommerce:send');
          } else if (u.data.order_id instanceof Array && u.data.order_id.length > 0) {
            if (!u.required["ecommerce"]) {
              u.required["ecommerce"] = !0;
              u.all("require", "ecommerce", "ecommerce.js");
            }
            // an array of order ids will fire multiple transacations
            var lastindex = 0;
            for (f = 0; f < u.data.order_id.length; f++) {

              if (f === u.data.order_id.length - 1 || (u.data.order_id[f] !== u.data.order_id[f + 1])) {
                g = {};
                u.setHitData(g, "transaction_events");
                g.id = u.data.order_id[f];
                g.affiliation = (u.data.affiliation && typeof u.data.affiliation[f] !== "undefined" ? u.data.affiliation[f] : u.data.order_store);
                g.revenue = (u.data.revenue && typeof u.data.revenue[f] !== "undefined" ? u.data.revenue[f] : u.data.order_total);
                g.shipping = (u.data.shipping && typeof u.data.shipping[f] !== "undefined" ? u.data.shipping[f] : u.data.order_shipping);
                g.tax = (u.data.tax && typeof u.data.tax[f] !== "undefined" ? u.data.tax[f] : u.data.order_tax);
                g.currency = (u.data.currency ? u.data.currency : u.data.order_currency);
                u.all('ecommerce:addTransaction', g);

                for (e = lastindex; e < f + 1; e++) {
                  g = {};
                  g.id = u.data.order_id[f];
                  g.sku = u.data.product_id[e];
                  g.name = (u.data.product_name[e] ? u.data.product_name[e] : u.data.product_id[e]);
                  g.category = (u.data.product_category[e] ? u.data.product_category[e] : "");
                  g.price = (u.data.product_unit_price[e] ? u.data.product_unit_price[e] : "1.00");
                  g.quantity = (u.data.product_quantity[e] ? u.data.product_quantity[e] : "1");
                  u.setHitData(g, "transaction_events");
                  u.all('ecommerce:addItem', g);
                }
                lastindex = f + 1;
              }
            }
            u.all('ecommerce:send');
          }
          // end standard page view block
        }
        // begin event logic
        if (u.data.eventCategory && u.data.eventAction) {
          g = {};
          u.setHitData(g, "link_events");
          g.hitType = "event";
          g.eventCategory = u.data.eventCategory;
          if (u.data.nonInteraction) {g.nonInteraction = 1;}
          g.eventAction = u.data.eventAction;
          if (u.data.eventLabel) {
            g.eventLabel = u.data.eventLabel;
          }
          if (typeof u.data.eventValue !== "undefined" && u.data.eventValue !== "") {
            g.eventValue = u.data.eventValue;
          }
          if ( u.data.standard_event_cb ) {
            g.hitCallback = u.data.standard_event_cb;    
          }
          // send screenName on event call when mapped
          if (u.data.screenView === "true" || u.data.screenView === true) {
            g.screenName = u.data.screen_title || "";
          }
          if (u.data.sessionControl === "start" || u.data.sessionControl === "end"){
            g.sessionControl = u.data.sessionControl;
          }
          u.all("send", g);
          // clear variables after each event
          u.data.eventCategory = u.data.eventAction = u.data.eventLabel = u.data.eventValue = "";
        }

        for (e = 0; e < u.data.ga_events.length; e++) {
          g = {};
          u.setHitData(g, "link_events");
          g.hitType = "event";
          g.eventCategory = u.data.ga_events[e].eventCategory;
          g.eventAction = u.data.ga_events[e].eventAction;
          g.eventLabel = u.data.ga_events[e].eventLabel;
          g.eventValue = u.data.ga_events[e].eventValue;
          if (u.data.ga_events[e].nonInteraction) {g.nonInteraction = 1;}
          if (u.data.sessionControl === "start" || u.data.sessionControl === "end"){
            g.sessionControl = u.data.sessionControl;
          }
          u.all("send", g);
        }
        // end event logic
        if (u.data.socialNetwork && u.data.socialAction && u.data.socialTarget) {
          g = {};
          g.hitType = "social";
          g.socialNetwork = u.data.socialNetwork;
          g.socialAction = u.data.socialAction;
          g.socialTarget = u.data.socialTarget;
          u.all("send", g);
          u.data.socialNetwork = u.data.socialAction = u.data.socialTarget = "";
        }

        if (u.data.timingCategory && u.data.timingVar && u.data.timingValue) {
          g = {};
          g.hitType = "timing";
          g.timingCategory = u.data.timingCategory;
          g.timingVar = u.data.timingVar;
          g.timingValue = u.data.timingValue;
          g.timingLabel = u.data.timingLabel || "";
          u.all("send", g);
        }

        // Map account ID to ga-disable to disable tracking for that account
        if (u.data["ga-disable"]) {
          window["ga-disable-" + u.data["ga-disable"]] = true;
        }

        (function() {
          var id = 'tealium-tag-7110';
          if (document.getElementById(id)) { return;}
          u.loader({"type": "script",  "src": 'https://www.google-analytics.com/analytics.js',  "loc": "script", "id": id });
          u.o.l = 1 * new Date(); //This is required by Google. Current tiemstamp
        })();

        //##UTENABLEDEBUG##utag.DB("send:##UTID##:COMPLETE");
      }
    };
    utag.o[loader].loader.LOAD(id);
  }('269', 'digikey.main'));
} catch (error) {
  utag.DB(error);
}
//end tealium universal tag
