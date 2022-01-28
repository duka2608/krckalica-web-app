@extends('pages.home')
@section('content')
<div class="right_col" role="main">
    <div class="">
      <div class="page-title">

      <div class="row">
        <div class="col-md-12">
          <div class="x_panel">
            <div class="x_title">
              <h1>{{ $recipe->name }}</h1>
              <div class="clearfix"></div>
            </div>

            <div class="x_content">

              <div class="col-md-9 col-sm-9 col-xs-12">

                <div id="mainb" style="height:350px;">
                    <h1>Slika recepta</h1>
                </div>

                <div>

                  <h4>Recent Activity</h4>

                  <!-- end of user messages -->
                  <ul class="messages">
                    <li>
                      <img src="images/img.jpg" class="avatar" alt="Avatar">
                      <div class="message_date">
                        <h3 class="date text-info">24</h3>
                        <p class="month">May</p>
                      </div>
                      <div class="message_wrapper">
                        <h4 class="heading">Desmond Davison</h4>
                        <blockquote class="message">Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua butcher retro keffiyeh dreamcatcher synth.</blockquote>
                        <br />
                        <p class="url">
                          <span class="fs1 text-info" aria-hidden="true" data-icon=""></span>
                          <a href="#"><i class="fa fa-paperclip"></i> User Acceptance Test.doc </a>
                        </p>
                      </div>
                    </li>
                    <li>
                      <img src="images/img.jpg" class="avatar" alt="Avatar">
                      <div class="message_date">
                        <h3 class="date text-error">21</h3>
                        <p class="month">May</p>
                      </div>
                      <div class="message_wrapper">
                        <h4 class="heading">Brian Michaels</h4>
                        <blockquote class="message">Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua butcher retro keffiyeh dreamcatcher synth.</blockquote>
                        <br />
                        <p class="url">
                          <span class="fs1" aria-hidden="true" data-icon=""></span>
                          <a href="#" data-original-title="">Download</a>
                        </p>
                      </div>
                    </li>
                    <li>
                      <img src="images/img.jpg" class="avatar" alt="Avatar">
                      <div class="message_date">
                        <h3 class="date text-info">24</h3>
                        <p class="month">May</p>
                      </div>
                      <div class="message_wrapper">
                        <h4 class="heading">Desmond Davison</h4>
                        <blockquote class="message">Raw denim you probably haven't heard of them jean shorts Austin. Nesciunt tofu stumptown aliqua butcher retro keffiyeh dreamcatcher synth.</blockquote>
                        <br />
                        <p class="url">
                          <span class="fs1 text-info" aria-hidden="true" data-icon=""></span>
                          <a href="#"><i class="fa fa-paperclip"></i> User Acceptance Test.doc </a>
                        </p>
                      </div>
                    </li>
                  </ul>
                  <!-- end of user messages -->


                </div>


              </div>

              <!-- start project-detail sidebar -->
              <div class="col-md-3 col-sm-3 col-xs-12">

                <section class="panel">

                  <div class="x_title">
                    <h2>{{ $recipe->category->name }}</h2>
                    <div class="clearfix"></div>
                  </div>
                  <div class="panel-body">
                    <h3 class="green">{{ $recipe->name }}</h3>

                    <p>{{ $recipe->description }}</p>
                    <br />

                    <div class="project_detail">

                      <p class="title">Vreme pripreme</p>
                      <p>{{ $recipe->preparation_time }}</p>
                      <p class="title">Broj porcija</p>
                      <p>{{ $recipe->portions }}</p>
                    </div>

                    <br />
                    <h5>Sastojci</h5>
                    <ul class="title">
                      @foreach ($recipe->ingredients as $ingredient)
                        <li>
                            {{ $ingredient->name.' '.$ingredient->amount }}
                        </li>
                      @endforeach
                    </ul>
                    <br />

                    <div class="text-center mtop20">
                      <a href="{{ route('admin.recipes.edit', $recipe->id) }}" class="btn btn-sm btn-primary">Uredi recept</a>
                      <a href="{{ route('admin.recipes') }}" class="btn btn-sm btn-success">Nazad</a>
                    </div>
                  </div>

                </section>

              </div>
              <!-- end project-detail sidebar -->

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
@endsection