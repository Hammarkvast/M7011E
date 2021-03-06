
<?php
  /*callapi function start */
  function callapi($method, $url, $data) {

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $url);

    if($method == 'POST') {
      curl_setopt($ch, CURLOPT_POST, 1);
      curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    }

    if($method == 'PUT') {
      curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
      curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
    }

    if($method == 'DELETE') {
      curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
    }
    
    curl_setopt($ch, CURLOPT_URL, $url);
      curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json',
      ));
      curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

      $output = curl_exec($ch);

    curl_close ($ch);

    return $output;
  }
  /*callapi function end */

  $result = '';

  // Call GET method fetch all records
  $method = 'GET';
  $url = 'http://localhost:3000/owner';
  $data = NULL;

  $products = callapi($method, $url, $data);

  //Call GET method fetch single record
  if(isset($_GET['action']) && $_GET['action'] == 'edit') {

    $id = $_GET['id'];

    $method = 'GET';
    $url = 'http://localhost:3000/owner/'.$id;
    $data = NULL;

    $prod = callapi($method, $url, $data);
    $prod = json_decode($prod);
  }

  //Call DELETE method
  if(isset($_GET['action']) && $_GET['action'] == 'del') {

    $id = $_GET['id'];

    $method = 'DELETE';
    $url = 'http://localhost:3000/owner/delete/'.$id;
    $data = NULL;

    $result = callapi($method, $url, $data);

    header('location: index.php');
  }
  
  if(isset($_POST['submit']))
  {
    // Call POST method
    if($_POST['submit'] == 'create')
    {
      $method = 'POST';
      $url = 'http://localhost:3000/owners/create';
      $data = json_encode($_POST);

      $result = callapi($method, $url, $data);

      header('location: index.php');
    }

    // Call PUT method
    if($_POST['submit'] == 'update')
    {
      $id = $_POST['id'];

      $method = 'PUT';
      $url = 'http://localhost:3000/owners/update/'.$id;
      $data = json_encode($_POST);

      $result = callapi($method, $url, $data);

      header('location: index.php');
    }
  }
?>
<!doctype html>
<html>
  <head>
    <title>Call Node.Js API</title>
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
  </head>
  <body>
    <div class="container">
      <h1>Call Node.Js API</h1>
      <hr />
      <p><?php echo $result ?></p>
      <form action="" method="POST">
        <div class="form-row">
          <div class="col-md-3">
            <input type="text" name="username" class="form-control" placeholder="username" />
          </div>
          <div class="col-md-3">
            <input type="text" name="password" class="form-control" placeholder="password" />
          </div>
          <div class="col-md-3">
            <input type="text" name="houseid" class="form-control" placeholder="houseid" />
          </div>
          <div class="col-md-3">
            <button type="submit" name="submit" value="create" class="btn btn-success">Create</button>
          </div>
        </div>
      </form>
      <?php if(isset($_GET['action']) && $_GET['action'] == 'edit') { ?>
      <br />
      <form action="" method="POST">
        <div class="form-row">
          <div class="col-md-3">
            <input type="text" name="username" class="form-control" value="<?php echo $owners->username ?>" />
          </div>
          <div class="col-md-3">
            <input type="text" name="password" class="form-control" value="<?php echo $owners->password ?>" />
          </div>
          <div class="col-md-3">
            <input type="text" name="houseid" class="form-control" value="<?php echo $owners->houseid ?>" />
          </div>
          <div class="col-md-3">
            <input type="hidden" name="id" value="<?php echo $prod->id ?>" />
            <button type="submit" name="submit" value="update" class="btn btn-warning">Update</button>
          </div>
        </div>
      </form>
      <?php } ?>
      <br />
      <div class="row">
        <div class="col-md-12">
          <?php $owners = json_decode($owners) ?>
          <?php if(!empty($owners)) { ?>
            <table class="table">
              <tr>
                <th>#ID</th>
                <th>username</th>
                <th>password</th>
                <th>houseid</th>
                <th>Action</th>
              </tr>
            <?php foreach($owners as $owners) { ?>
              <tr>
                <td><?php echo $owners->id ?></td>
                <td><?php echo $owners->houseid ?></td>
                <td><?php echo $owners->username ?></td>
                <td><?php echo $owners->password ?></td>
                <td>
                  <a href="index.php?id=<?php echo $owners->id ?>&action=edit" class="btn btn-info btn-sm">Edit</a>
                  <a href="index.php?id=<?php echo $owners->id ?>&action=del" class="btn btn-danger btn-sm">Delete</a>
                </td>
              </tr>
            <?php } ?>
            </table>
          <?php } ?>
        </div>
      </div>
    </div>
  </body>
</html>
