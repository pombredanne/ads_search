function getQueryVariable(variable) { 
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { 
            return pair[1];
        }
    }
    return -1;
}

function getSearchString() {
    var ads = getQueryVariable("ads");
    if (ads != -1) {
        return parseSearchString(ads);
    }
    
    // not implemented
    // var arxiv = getQueryVariable("arxiv");
    // if (arxiv != -1) {
    //     return parseSearchString(arxiv);
    // }
    
    return -1;
}

function parseSearchString(flag) {
    au = [];
    yr = [];
    
    if (flag == 1) {
        // parse years
        y1 = document.searchform.year1.value;
        y2 = document.searchform.year2.value;
        if (y1 != "") {
            yr.push(y1);
        }
        if (y2 != "") {
            yr.push(y2);
        }
        searchstr = document.searchform.author.value;
    } else {
        searchstr = flag;
    }
    
    // parse authors
    aut_logic = "AND"; // default logic
    searcharr = unescape(searchstr).split(/[\s+]/g);
    for (var i = 0; i < searcharr.length; i++) {
        if (flag != 1 && (searcharr[i].search("20") != -1 || searcharr[i].search("19") != -1)) {
             yr.push(searcharr[i]);
        } else if (searcharr[i].toLowerCase() == "and") {
            aut_logic = "AND";
        } else if (searcharr[i].toLowerCase() == "or") {
            aut_logic = "OR";
        } else {
            au.push(searcharr[i]);
        }
    }
    return [aut_logic,au,yr.sort()]
}

function getADSURL(flag) {
    if (flag == 0) {
        searchres = getSearchString();
    } else {
        searchres = parseSearchString(flag);
    }
    
    if (searchres != -1) {
        aut_logic = searchres[0];
        au = searchres[1];
        yr = searchres[2];
        
        start = "";
        end   = "";
        
        if (yr.length >= 1) {
            start = yr[0];
            if (yr.length >= 2) {
                end = yr[1];
            } else {
                end = start;
            }
        }
        
        author = ""
        for (var i = 0; i < au.length; i++) {
            author += au[i]+"\r\n";
        }
        author = escape(author);
        
        return "http://adsabs.harvard.edu/cgi-bin/nph-abs_connect?db_key=AST&db_key=PRE&qform=AST&arxiv_sel=astro-ph&arxiv_sel=cond-mat&arxiv_sel=cs&arxiv_sel=gr-qc&arxiv_sel=hep-ex&arxiv_sel=hep-lat&arxiv_sel=hep-ph&arxiv_sel=hep-th&arxiv_sel=math&arxiv_sel=math-ph&arxiv_sel=nlin&arxiv_sel=nucl-ex&arxiv_sel=nucl-th&arxiv_sel=physics&arxiv_sel=quant-ph&arxiv_sel=q-bio&sim_query=YES&ned_query=YES&adsobj_query=YES&aut_logic="+aut_logic+"&obj_logic=OR&author="+author+"&object=&start_mon=&start_year="+start+"&end_mon=&end_year="+end+"&ttl_logic=OR&title=&txt_logic=OR&text=&nr_to_return=200&start_nr=1&jou_pick=ALL&ref_stems=&data_and=ALL&group_and=ALL&start_entry_day=&start_entry_mon=&start_entry_year=&end_entry_day=&end_entry_mon=&end_entry_year=&min_score=&sort=SCORE&data_type=SHORT&aut_syn=YES&ttl_syn=YES&txt_syn=YES&aut_wt=1.0&obj_wt=1.0&ttl_wt=0.3&txt_wt=3.0&aut_wgt=YES&obj_wgt=YES&ttl_wgt=YES&txt_wgt=YES&ttl_sco=YES&txt_sco=YES&version=1";
    } else {
        document.getElementById('placeholder').className='hidden';
        document.getElementById('container').className='unhidden';
    }
    
    return -1;
}

function doADSSearch(flag) {
    //if (flag == 1) {
    //    flag = document.searchform.ads.value;
    //}
    adsurl = getADSURL(flag);
    if (adsurl != -1) {
        window.location = adsurl;
    }
}