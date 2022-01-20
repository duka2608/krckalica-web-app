<!DOCTYPE html>
<html lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <!-- Meta, title, CSS, favicons, etc. -->
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}" />

        <title>Admin | Krčkalica</title>

        <link href="{{ asset('assets/gentelella/vendors/bootstrap/dist/css/bootstrap.min.css') }}" rel="stylesheet">
        <link href="{{ asset('assets/gentelella/vendors/font-awesome/css/font-awesome.min.css') }}" rel="stylesheet">
        <link href="{{ asset('assets/gentelella/vendors/nprogress/nprogress.css') }}" rel="stylesheet">
        <link href="{{ asset('assets/gentelella/vendors/animate.css/animate.min.css') }}" rel="stylesheet">
        <link href="{{ asset('assets/gentelella/build/css/custom.min.css') }}" rel="stylesheet">

        <link href="{{ asset('assets/css/admin.css?v=1.0.2') }}" rel="stylesheet">
    </head>

    <body class="login">
        <div>
            <div class="login_wrapper">
                <div class="animate form login_form">
                    <section class="login_content">
                        <form  id="login-form">
                            <h1>Krčkalica Admin</h1>
                            <div class="form-group">
                                <input type="email" name="email" class="form-control" placeholder="Email" required="" />
                                <span class="error-custom error-email"></span>
                            </div>
                            <div class="form-group">
                                <input type="password" name="password" class="form-control" placeholder="Password" required="" />
                                <span class="error-custom error-password"></span>
                            </div>
                            <div>
                                <button class="btn btn-default submit" style="width: 100%;">Log in</button>
                            </div>
                        </form>
                    </section>
                </div>
            </div>
        </div>

        <script src="{{ asset('assets/gentelella/vendors/jquery/dist/jquery.min.js') }}"></script>
        <script src="{{ asset('assets/js/admin.js?v=1.0.2') }}"></script>
    </body>
</html>
