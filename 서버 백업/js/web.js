$(document).ready(function () {
});


function logic2(url,params,callback){

    $.ajax({
        contentType: false,       // The content type used when sending data to the server.
        cache: false,             // To unable request pages to be cached
        processData: false,        // To send DOMDocument or non processed data file it is set to false
        type:"POST",
        url: url,
        data: params,
        timeout: 60000,
        success:callback ,
        error: function (request, textStatus, errorThrown){
            // alert(textStatus);
            alert("code:"+request.status+"\n"+"message:"+request.responseText+"\n"+"error:"+errorThrown);
        },
        progress: function(e) {
            if(e.lengthComputable) {
                var pct = (e.loaded / e.total) * 100;
                $('#prog')
                    .progressbar('option', 'value', pct)
                    .children('.ui-progressbar-value')
                    .html(pct.toPrecision(3) + '%')
                    .css('display', 'block');
            } else {
                console.warn('Content Length not reported!');
            }
        }
    });
}

function api(id) {
    let lb;
    let form = $('#' + id)[0];
    let formData = new FormData(form);
    let url = "";
    let is_logic = true;


    if(id === 'inquiryForm'){
        url = "../api/web/inquiry";
    }
    if(is_logic){
        logic2(url, formData, function callback(responseData) {
            if (lb) lb.close();
            if (!responseData.result) {
                alert(responseData.error_message);
            }
            if (responseData.result) {
                result(id, responseData);
            }
        });
    }


}

function result(id, responseData) {

    var form = $('#' + id)[0];
    var formData = new FormData(form);
    var is_show_message = true;
    let is_reload = false;
    let is_index = false;
    let is_back = false;
    let is_logout = false;
    let is_window_close = false;
    let is_parent_window_reload = false;
    let is_move_url = false;
    let move_url = "";

    // 문의 결과
    if(id === 'inquiryForm'){
        is_reload = true;
    }

    if (is_show_message) {
        alert(responseData.error_message);
    }
    if (is_reload) {
        location.reload();
    }
    if (is_index) {
        location.href = 'login';
    }
    if (is_back) {
        history.back();
    }
    if(is_logout){
        location.href = '/logout.php'
    }
    if(is_parent_window_reload){
        opener.location.reload();
    }
    if(is_window_close){
        window.close();
    }
    if(is_move_url && move_url){
        location.href = move_url;
    }
}

function GoBackWithRefresh(event) {
    if ('referrer' in document) {
        window.location = document.referrer;
        /* OR */
        //location.replace(document.referrer);
    } else {
        window.history.back();
    }
}

// 페이지 이동
function movePage(page) {
    $('#formSearch #page').val(page);
    $('#formSearch').submit();
}

function searchList() {
    movePage('1');
    return false;
}

function movePage2(page) {
    $('#formSearch #page').val(page);
    api('formSearch');
}


function searchInit() {
    movePage2(1);
}

function goTotalSearch() {
    let search = $('#TOTAL_SEARCH').val();
    if (search) {
        location.href = "search?S=" + search;
    }
}
function fileClick(id) {
    $('#' + id).click();
}


/**
 *  페이지 이름 가져오기
 *  @return pageName 현재 페이지 이름
 */
function getPageName() {
    var pageName = "";

    var tempPageName = window.location.href;
    var strPageName = tempPageName.split("/");
    pageName = strPageName[strPageName.length - 1].split("?")[0];

    return pageName;
}



function readImg(input, imageId) {
    let imagename = "";
    if (input.files && input.files[0]) {
        imagename = input.files[0].name;
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#' + imageId).attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);



        // if (imageId.indexOf('file_image_') !== -1){
        //     let idx = imageId.replace(/file_image_/gi, "");
        //     $('#file_delete_btn_'+idx).show();
        //     $('#file_id_'+idx).val('');
        //
        //     let name = input.files[0].name;
        //     if(name.length>30)name = name.substring(0,30)
        //     $('#file_name_'+idx).html(name);
        // }
        // if(imageId === 'board_thum_file_img'){
        //     $('#board_thum_file_delete_btn').show();
        // }
        // if(imageId === 'board_thum_file_img2'){
        //     $('#board_thum_file_delete_btn2').show();
        // }
        // if(imageId === 'board_thum_file_img3'){
        //     $('#board_thum_file_delete_btn3').show();
        // }

    }
}

function imageClick(id) {
    console.log(id);
    $('#' + id).click();
}

function readFileName(input, imageId) {
    if (input.files && input.files[0]) {
        $('#' + imageId).html(input.files[0].name);
    }

    if(imageId === 'education_image_name') $('#education_image_a').hide();
}


function deleteImage(id) {

    let fileId  = id;


    console.log('id : ' + id);
   // if (id.indexOf('file') !== -1){
   //      $('#'+id).attr('src', 'https://dummyimage.com/200x150/ced4da/ffffff&text=835x626');
   //      let idx = id.replace(/file_image_/gi, "");
   //      fileId = "file_"+idx;
   //      $('#file_id_'+idx).val('');
   //      $('#file_delete_btn_'+idx).hide();
   //      $('#file_name_'+idx).html('');
   //  }


    if(id === 'board_thum_file'){
        if (!confirm("해당 이미지를 삭제하시겠습니까? 삭제 시 복구가 어렵습니다.")) {
            return;
        }
        $('#board_thum_file_del').val('y');
        $('#board_thum_file_name').hide();
        $('#board_thum_file_img').attr('src', 'https://dummyimage.com/320x240/ced4da/ffffff&text=640x480');
    }
    if(id === 'board_thum_file2'){
        if (!confirm("해당 이미지를 삭제하시겠습니까? 삭제 시 복구가 어렵습니다.")) {
            return;
        }
        $('#board_thum_file_del2').val('y');
        $('#board_thum_file_name2').hide();
        $('#board_thum_file_img2').attr('src', 'https://dummyimage.com/320x240/ced4da/ffffff&text=640x480');
    }
    if(id === 'board_thum_file3'){
        if (!confirm("해당 이미지를 삭제하시겠습니까? 삭제 시 복구가 어렵습니다.")) {
            return;
        }
        $('#board_thum_file_del3').val('y');
        $('#board_thum_file_name3').hide();
        $('#board_thum_file_img3').attr('src', 'https://dummyimage.com/320x240/ced4da/ffffff&text=640x480');
    }


    if (id.indexOf('file') !== -1) {
        // 파일 삭제
        let idx = id.replace(/file/gi, "");
        $('#file_del'+idx).val('y');
        $('#file_a'+idx).parent().hide();
        $('#file_url'+idx).val('');
    }

    if(fileId){
        if ($.browser && $.browser.msie) {
            $("#" + fileId).replaceWith($("#" + fileId).clone(true));
        } else {
            $("#" + fileId).val("");
        }
    }

}
let imageIdx = 0;
function imageAdd(idPrifix, namePrifix, appenParentId) {
    imageIdx = imageIdx + 1;

    let imageId = idPrifix + "_"+imageIdx;
    let fileId  = idPrifix + "_file_"+imageIdx;
    let fileName = namePrifix +"_file_"+imageIdx;

    //https://dummyimage.com/150x150/8c7f8c/ffffff&text=Add+Image

    var image = '<div style="float: left; margin-left: 10px; margin-bottom: 10px; text-align: center"><img src="https://dummyimage.com/150x150/8c7f8c/ffffff&text=Add+Image" style="width: 150px; height: 150px; object-fit: fill;" onclick="imageClick(\''+fileId+'\')" id="'+imageId+'">';
    image += '<input type="file" name="'+fileName+'" style="display: none" id="'+fileId+'" onchange="readImg(this,\''+imageId+'\')"><br/>';
    image += '<input type="submit" value="등록" class="btn-search" onclick="imageClick(\''+fileId+'\')">';
    image += '<input style="margin-left: 5px;" type="submit" value="삭제" class="btn-search" onclick="deleteImage(\''+imageId+'\')"></div>';
    $('#'+appenParentId).append(image);

};



let map;
let pos;
let marker;
let markers = []
let markerCluster;
//단순 지도 보여주기
function initMap() {
    let lat = 37.288412;
    let lon = 127.051658;

    pos = {lat: lat, lng: lon};
    map = new google.maps.Map(document.getElementById("map"), {
        center: pos,
        zoom: 14,
        disableDefaultUI: true,
        zoomControl: true,

    });
    refreshMap();
    scheduler();
    setInterval(scheduler, 20000)

}



function showWarning(message){
    alert(message);
}


function addOption(value, name) {
    return '<option value="' + value +'">' + name +'</option>';
}







/**
 * 중복체크 하기
 * @param cType
 * @param cVal
 * @param cId
 */
function duplicate(cType, cValId, cReferId){


    var $form = $("#duplicateCheckForm");
    if($form.length < 1) {
        $form = $("<form/>").attr({id:"duplicateCheckForm", method:'POST'});
        $(document.body).append($form);
    }
    $form.empty();

    $("<input></input>").attr({type:"hidden", name:"check_type", value:cType}).appendTo($form);
    $("<input></input>").attr({type:"hidden", name:"check_value", value:$('#'+cValId).val()}).appendTo($form);
    if($('#'+cReferId).val()) $("<input></input>").attr({type:"hidden", name:"check_id", value:$('#'+cReferId).val()}).appendTo($form);


    api('duplicateCheckForm');


}


function closePopup() {
    window.close();
}




