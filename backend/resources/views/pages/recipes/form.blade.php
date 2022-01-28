@php
    $route = request()->routeIs('admin.recipes.edit');
@endphp
<form method="POST" action="{{ $route ? route('admin.recipes.update', $data['recipe']->id) : route('admin.recipes.store') }}" id="submit-admin-form" class="form-horizontal form-label-left">
    @if(request()->routeIs('admin.recipes.edit'))
        @method('PUT')
    @endif
    @csrf

    <div class="form-group">
        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="first_name">Naziv<span class="required">*</span>
        </label>
        <div class="col-md-6 col-sm-6 col-xs-12">
            <input type="text" name="recipe_name" id="recipe_name"  class="form-control col-md-7 col-xs-12" required="required" value="{{ $route ? $data['recipe']->name : old('recipe_name') }}">
            @error('first_name')
                <span class="error-custom error-custom-input error-recipe">{{ $message }}</span>
            @enderror
        </div>
    </div>
    <div class="form-group">
        <label for="middle-name" class="control-label col-md-3 col-sm-3 col-xs-12">Kategorija <span class="required">*</span></label>
        <div class="col-md-6 col-sm-6 col-xs-12">
            <select name="role" class="form-control change-recipe-category">
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
            <select name="role" class="form-control change-recipe-cuisine">
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
    <div class="ln_solid"></div>
    <div class="form-group">
        <div class="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
            <a href="{{ route('admin.recipes') }}" class="btn btn-primary">Cancel</a>
            <button type="submit" class="btn btn-success">Submit</button>
        </div>
    </div>
</form>