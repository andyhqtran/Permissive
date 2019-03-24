"use strict";function createPost(t,a){if(!window.page||!a)return!1;var e=void 0;if("blog"===a){e=$('<article class="article" />');var n=$('<header class="article__header" />'),o=new Date(t.published_at).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"2-digit"});n.append('<time class="article__date" datetime="'+o+'">'+o+"</time>");for(var i=$('<div class="article__tags" />'),s=0;s<t.tags.length;s+=1)0===s?i.append('<a href="/tag/'+t.tags[s].name+'">'+t.tags[s].name+"</a>"):i.append('<a href="/tag/'+t.tags[s].name+'">, '+t.tags[s].name+"</a>");n.append('<span style="margin: 0 5px; vertical-align: middle;"> &middot; </span>'),n.append(i),n.append('<h2 class="article__title"><a href="'+t.url+'">'+t.title+"</a></h2>"),e.append(n);var r=$('<section class="article__content" />');t.markdown.length>500?r.html(t.html.substr(0,500).replace(/\s+$/,"")+"..."):r.html(t.html.replace(/\s+$/,"")),r.children().contents(":not(p):not(b):not(i):not(u):not(a):not(strong):not(em), .button, .input").remove(),r.contents("div, blockquote, pre, code, hr, br").remove(),e.append(r);var p=$('<footer class="article__footer" />'),d=$('<div class="button-group" />');d.append('<a class="button button--primary" href="'+t.url+'">View Post</a>'),d.append('<button class="button"><span class="ion ion-android-bookmark"></span></button>'),p.append(d),e.append(p)}if("project"===a){e=$('<div class="project" />');var l=$('<header class="project__header" />');l.append('<h5 class="project__title"><a href="'+t.url+'">'+t.title+"</a></h5>");for(var c=$('<h6 class="project__sub-title" />'),g=0;g<t.tags.length;g+=1)0===g?c.append('<a href="/tag/'+t.tags[g].name+'">'+t.tags[g].name.toUpperCase()+"</a>"):c.append('<a href="/tag/'+t.tags[g].name+'">, '+t.tags[g].name.toUpperCase()+"</a>");if(l.append(c),e.append(l),t.image){var w=$('<div class="project__thumbnail" />');w.append('<img alt="'+t.title+'" src="'+t.image+'" />'),e.append(w)}var u=$('<div class="project__content" />');t.markdown.length>125?u.append('<p class="project__excerpt">'+t.markdown.substr(0,125).replace(/\s+$/,"")+"...</p>"):u.append('<p class="project__excerpt">'+t.markdown+"</p>"),u.append('<a class="button" href="'+t.url+'"><span>Read More</span> <span class="icon ion-arrow-right-c" style="font-size: 0.625rem;"></span></a>'),e.append(u)}return e}function onSuccess(t){"post"===window.page.type&&$(".blog-grid").empty(),"project"===window.page.type&&$(".project-grid").empty(),$.each(t.posts,function(t,a){"post"===window.page.type&&$(".blog-grid").append(createPost(a,"blog")),"project"===window.page.type&&$(".project-grid").append(createPost(a,"project"))})}function paginationRequest(){return $.get(ghost.url.api("posts",{include:"pagination",filter:window.page.filter,order:window.page.order,page:window.currentPage,limit:window.postsPerPage}))}function postRequest(t){return $.get(ghost.url.api("posts",t))}jQuery(document).ready(function(){return ghost.url.api&&window.page?(window.currentPage=parseInt(window.location.hash.substring(1),10)||1,window.postsPerPage=window.page.limit||1,window.postOptions={include:"tags,author",filter:window.page.filter,order:window.page.order,page:window.currentPage,limit:window.postsPerPage},paginationRequest().done(function(t){var a=$('<div class="pagination" />'),e=$('<div class="button-group" />');return e.append('<button class="button" id="pagination-left"><span class="icon ion-arrow-left-c"></span></button>'),e.append('<button class="button" id="pagination-right"><span class="icon ion-arrow-right-c"></span></button>'),a.append(e),$(".page__container").append(a),window.totalPages=t.meta.pagination.pages,window.currentPage>=window.totalPages&&(window.currentPage=window.totalPages,window.postOptions.page=window.totalPages,window.location.hash="#"+window.currentPage,$("#pagination-right").attr("disabled",!0).addClass("button--disabled").hide()),window.currentPage===window.totalPages&&$("#pagination-right").attr("disabled",!0).addClass("button--disabled").hide(),1===window.currentPage&&$("#pagination-left").attr("disabled",!0).addClass("button--disabled").hide(),$("#pagination-left").on("click",function(){return 1!==window.currentPage&&(window.currentPage-=1,window.postOptions.page-=1,1===window.currentPage&&$("#pagination-left").attr("disabled",!0).addClass("button--disabled").hide(),$("#pagination-right").attr("disabled",!1).removeClass("button--disabled").show(),window.location.hash="#"+window.currentPage,postRequest(window.postOptions).done(onSuccess))}),$("#pagination-right").on("click",function(){return window.currentPage+=1,window.postOptions.page+=1,$("#pagination-left").attr("disabled",!1).removeClass("button--disabled").show(),window.currentPage>=window.totalPages&&$("#pagination-right").attr("disabled",!0).addClass("button--disabled").hide(),window.location.hash="#"+window.currentPage,postRequest(window.postOptions).done(onSuccess)}),postRequest(window.postOptions).done(onSuccess)}),postRequest(window.postOptions).done(onSuccess)):(console.log("nope"),!1)});