<!DOCTYPE html>
<html lang="en">
  @include('common.head')

  <body class="nav-md">
    <div class="container body">
      <div class="main_container">

        @include('partials.sidebar')
        @include('partials.navigation')

        @yield('content')


        @include('partials.footer')
        @include('common.scripts')
      
      </div>
    </div>
  </body>
</html>