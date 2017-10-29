function getFormData($form){
var unindexed_array = $form.serializeArray();
var indexed_array = {};

$.map(unindexed_array, function(n, i){
indexed_array[n['name']] = n['value'];
});

return indexed_array;
}



$(document).on('ready', function() {
    $('#new-student').on('click', function(event) {
      event.preventDefault();
      var data = JSON.stringify(getFormData($('#students_list')));
       $.ajax({
            type: "POST",
            url: '/',
            dataType: 'json',
            data: data,
            success: function(data) {
              console.log(data);
       }
     });
  });
});
