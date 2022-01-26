<div class="col-md-3 left_col">
    <div class="left_col scroll-view">
        <div class="navbar nav_title" style="border: 0;">
            <a href="#" class="site_title"><i class="fa fa-paw"></i> <span>Krčkalica</span></a>
        </div>

        <div class="clearfix"></div>
        <!-- menu profile quick info -->
        <div class="profile clearfix">
            <div class="profile_pic">
                {{-- <img src="#" alt="..." class="img-circle profile_img"> --}}
            </div>
            <div class="profile_info">
                <span>Administrator</span>
            </div>
            <div class="clearfix"></div>
        </div>
      <!-- /menu profile quick info -->

        <br />

      <!-- sidebar menu -->
        <div id="sidebar-menu" class="main_menu_side hidden-print main_menu">
            <div class="menu_section">
                <ul class="nav side-menu">
                        <li><a><i class="fa fa-users"></i> Korisnici <span class="fa fa-chevron-down"></span></a>
                            <ul class="nav child_menu">
                                <li><a href="{{ route('admin.users') }}">Svi korisnici</a></li>
                                <li><a href="{{ route('admin.users.create') }}">Dodaj korisnika</a></li>
                            </ul>
                        </li>
                        <li><a><i class="fa fa-list"></i> Recepti <span class="fa fa-chevron-down"></span></a>
                            <ul class="nav child_menu">
                                <li><a href="#">Svi recepti</a></li>
                                <li><a href="#">Dodaj recept</a></li>
                            </ul>
                        </li>
                        <li><a><i class="fa fa-location-arrow"></i> Lokacije <span class="fa fa-chevron-down"></span></a>
                            <ul class="nav child_menu">
                                <li><a href="{{ route('admin.locations') }}">Sve lokacije</a></li>
                                <li><a href="{{ route('admin.locations.create') }}">Dodaj lokaciju</a></li>
                            </ul>
                        </li>
                </ul>
            </div>
        </div>
      <!-- /sidebar menu -->
    </div>
</div>
