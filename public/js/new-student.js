$(document).on('ready', function() {
  $('#new-student').on('click', function(event) {
    event.PreventDefault();
    var data = $('#students_list').serialize();
     $.ajax({
          type: "POST",
          url: '/',
          dataType: 'json',
          data: data
      }).succes: function(data) {
      var sql = "INSERT INTO [student] ([name], [role], [domain]) VALUES " +
      "('" + data.name + "'" + "," + data.role + "," + data.domain + ")";
     }
});
