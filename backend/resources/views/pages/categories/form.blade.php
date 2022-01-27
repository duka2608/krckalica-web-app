@php
    $route = request()->routeIs('admin.categories.edit');
@endphp
<form method="POST" action="{{ $route ? route('admin.categories.update', $category->id) : route('admin.categories.store') }}" id="submit-admin-form" class="form-horizontal form-label-left">
    @if(request()->routeIs('admin.categories.edit'))
        @method('PUT')
    @endif
    @csrf

    <div class="form-group">
        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="category">Naziv kategorije<span class="required">*</span>
        </label>
        <div class="col-md-6 col-sm-6 col-xs-12">
            <input type="text" name="category" id="category"  class="form-control col-md-7 col-xs-12" required="required" value="{{ $route ? $category->name : old('category') }}">
            @error('category')
                <span class="error-custom error-custom-input error-category">{{ $message }}</span>
            @enderror
        </div>
    </div>
    <div class="ln_solid"></div>
    <div class="form-group">
        <div class="col-md-6 col-sm-6 col-xs-12 col-md-offset-3">
            <a href="{{ route('admin.categories') }}" class="btn btn-primary">Cancel</a>
            <button type="submit" class="btn btn-success">Submit</button>
        </div>
    </div>
</form>