@php
    $route = request()->routeIs('admin.recipes.edit');
@endphp
<form method="POST" action="{{ $route ? route('admin.recipes.update', $data['recipe']->id) : route('admin.recipes.store') }}" id="submit-admin-form" class="form-horizontal form-label-left" enctype="multipart/form-data">
    @if(request()->routeIs('admin.recipes.edit'))
        @method('PUT')
    @endif
    @csrf

    <div class="form-group">
        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="recipe_name">Naziv<span class="required">*</span>
        </label>
        <div class="col-md-6 col-sm-6 col-xs-12">
            <input type="text" name="recipe_name" id="recipe_name"  class="form-control col-md-7 col-xs-12" required="required" value="{{ $route ? $data['recipe']->name : old('recipe_name') }}">
            @error('recipe_name')
                <span class="error-custom error-custom-input error-recipe">{{ $message }}</span>
            @enderror
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="portions">Broj porcija<span class="required">*</span>
        </label>
        <div class="col-md-6 col-sm-6 col-xs-12">
            <input type="text" name="portions" id="portions"  class="form-control col-md-7 col-xs-12" required="required" value="{{ $route ? $data['recipe']->portions : old('portions') }}">
            @error('portions')
                <span class="error-custom error-custom-input error-recipe">{{ $message }}</span>
            @enderror
        </div>
    </div>
    <div class="form-group">
        <label for="middle-name" class="control-label col-md-3 col-sm-3 col-xs-12">Kategorija <span class="required">*</span></label>
        <div class="col-md-6 col-sm-6 col-xs-12">
            <select name="category" class="form-control change-recipe-category">
                @foreach ($data['categories'] as $category)
                    @if($route)
                        <option value="{{ $category->id }}" @if ($category->id === $data['recipe']->category_id) selected @endif>
                            {{ $category->name }}
                        </option>
                    @else
                        <option value="{{ $category->id }}">{{ $category->name }}</option>
                    @endif
                @endforeach
            </select>
        </div>
    </div>
    <div class="form-group">
        <label for="middle-name" class="control-label col-md-3 col-sm-3 col-xs-12">Kuhinja <span class="required">*</span></label>
        <div class="col-md-6 col-sm-6 col-xs-12">
            <select name="cuisine" class="form-control change-recipe-cuisine">
                @foreach ($data['cuisines'] as $cuisine)
                    @if($route)
                        <option value="{{ $cuisine->id }}" @if ($cuisine->id === $data['recipe']->cuisine_id) selected @endif>
                            {{ $cuisine->name }}
                        </option>
                    @else
                        <option value="{{ $cuisine->id }}">{{ $cuisine->name }}</option>
                    @endif
                @endforeach
            </select>
        </div>
    </div>
    <div class="form-group">
        <label for="description" class="control-label col-md-3 col-sm-3 col-xs-12">Opis <span class="required">*</span></label>
        <div class="col-md-6 col-sm-6 col-xs-12">
            <textarea name="description" id="description" class="form-control col-md-7 col-xs-12" required="required" style="resize: none">{{ $route ? $data['recipe']->description : old('description') }}</textarea>
            <span class="error-custom error-custom-input error-description"></span>
        </div>
    </div>
    <div class="form-group">
        <label for="advice" class="control-label col-md-3 col-sm-3 col-xs-12">Savet <span class="required">*</span></label>
        <div class="col-md-6 col-sm-6 col-xs-12">
            <textarea name="advice" id="advice" class="form-control col-md-7 col-xs-12" required="required" style="resize: none">{{ $route ? $data['recipe']->advice : old('advice') }}</textarea>
            <span class="error-custom error-custom-input error-advice"></span>
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="preparation_time">Vreme pripreme<span class="required">*</span>
        </label>
        <div class="col-md-6 col-sm-6 col-xs-12">
            <input type="text" name="preparation_time" id="preparation_time"  class="form-control col-md-7 col-xs-12" required="required" value="{{ $route ? $data['recipe']->preparation_time : old('preparation_time') }}">
            @error('preparation_time')
                <span class="error-custom error-custom-input error-preparation-time">{{ $message }}</span>
            @enderror
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="fast">Posno<span class="required">*</span>
        </label>
        <div class="col-md-6 col-sm-6 col-xs-12">
            @if($route)
                <input type="checkbox" name="fast" id="fast"  class="form-control col-md-7 col-xs-12" {{ $data['recipe']->fast ? 'checked' : ''  }}>
            @else 
                <input type="checkbox" name="fast" id="fast"  class="form-control col-md-7 col-xs-12">
            @endif
            
            @error('fast')
                <span class="error-custom error-custom-input error-fast">{{ $message }}</span>
            @enderror
        </div>
    </div>
    <div class="form-group">
        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="recipe_name">Slika recepta<span class="required">*</span>
        </label>
        <div class="col-md-6 col-sm-6 col-xs-12">
            <a class="btn" title="Insert picture (or just drag & drop)" id="pictureBtn"><i class="fa fa-picture-o"></i></a>
            <input type="file" data-role="magic-overlay" name="recipe-image" data-target="#pictureBtn" data-edit="insertImage" accept=".jpg, .jpeg, .png" />
        </div>
    </div>
    <div class="ln_solid"></div>
    <div class="form-group">
        <div class="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
            <a href="{{ route('admin.recipes') }}" class="btn btn-primary">Cancel</a>
            <button type="submit" class="btn btn-success">Submit</button>
        </div>
    </div>
</form>