@php
    $route = request()->routeIs('admin.recipes.edit');
@endphp
<form method="POST" action="{{ $route ? route('admin.recipes.update', $data['recipe']->id) : route('admin.recipes.store') }}" id="submit-admin-form" class="form-horizontal form-label-left" enctype="multipart/form-data">
    @if(request()->routeIs('admin.recipes.edit'))
        @method('PUT')
    @endif
    @csrf
    @if(session()->has('error'))
        <div class="alert alert-danger">
            <p>{{ session()->get('error') }}</p>
        </div>
    @endif
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
        <label class="control-label col-md-3 col-sm-3 col-xs-12">Sastojci</label>
    </div>

    @if ($route)
        <div class="form-group d-flex justify-content-md-center">
            <div id="ingredients" class="col-md-3 col-sm-3 col-xs-12 col-md-offset-3">
                 @foreach ($data['recipe']->ingredients as $ingredient)
                <div class="ingredients-container">
                    <label class="control-label">Sastojak</label>
                    <input type="text" class="form-control ingredient" name="name[]" value="{{ $ingredient->name }}"/>
                </div>
                @endforeach
            </div>
            <div id="amounts" class="col-md-auto col-sm-3 col-xs-12">
                @foreach ($data['recipe']->ingredients as $ingredient)

                <div class="amounts-container">
                    <label class="control-label">Kolicina</label>
                    <input type="text" class="form-control amount" name="amount[]" value="{{ $ingredient->amount }}"/>
                </div>
                @endforeach
            </div>
        </div>
        @else
        <div class="form-group d-flex justify-content-md-center">
            <div id="ingredients" class="col-md-3 col-sm-3 col-xs-12 col-md-offset-3">
                <div class="ingredients-container">
                    <label class="control-label">Sastojak</label>
                    <input type="text" class="form-control ingredient" name="name[]" />
                </div>
            </div>
            <div id="amounts" class="col-md-auto col-sm-3 col-xs-12">
                <div class="amount-container">
                    <label class="control-label">Kolicina</label>
                    <input type="text" class="form-control amount" name="amount[]" />
                </div>
            </div>
        </div>
    @endif

    
    <div class="form-group">
        <div class="col-md-auto col-md-offset-3 col-sm-6 col-xs-12">
            <a href="#" id="remove-field" class="btn btn-primary">Ukloni</a>
            <a href="#" id="add-field" class="btn btn-success">Dodaj</a>
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
            <button type="submit" id="submit-form" class="btn btn-success">Submit</button>
        </div>
    </div>
</form>

@section('script')
    <script>
        const ingredients = [{ name: "", amount: "" }];

        const ingredientContainer = document.getElementById("ingredients");
        const amountContainer = document.getElementById("amounts");

        const addField = document.getElementById("add-field");
        const removeField = document.getElementById("remove-field");

        const submitButton = document.getElementById("submit-form");

        addField.addEventListener("click", (e) => {
            e.preventDefault();

            let ingredients = document.createElement("div");
            let amounts = document.createElement("div");

            ingredients.classList.add("ingredients-container");
            amounts.classList.add("amounts-container");

            let ingredientsLabel = document.createElement("label");
            let amountLabel = document.createElement("label");

            ingredientsLabel.innerText = "Sastojak";
            amountLabel.innerText = "Kolicina";

            let ingredientEl = document.createElement("input");
            let amountEl = document.createElement("input");

            ingredientEl.setAttribute("type", "text");
            amountEl.setAttribute("type", "text");

            ingredientEl.setAttribute("name", "name[]");
            amountEl.setAttribute("name", "amount[]");

            ingredientEl.classList.add("form-control");
            amountEl.classList.add("form-control");
            ingredientEl.classList.add("ingredient");
            amountEl.classList.add("amount");



            ingredients.append(ingredientsLabel, ingredientEl);
            amounts.append(amountLabel, amountEl);

            ingredientContainer.appendChild(ingredients);
            amountContainer.appendChild(amounts);
        });

        removeField.addEventListener("click", (e) => {
            e.preventDefault();

            let allIngredients = document.querySelectorAll(".ingredients-container");
            let allAmounts = document.querySelectorAll(".amounts-container");

            console.log(allIngredients);
            console.log(allAmounts);
            
            if (allIngredients.length > 0 && allAmounts.length > 0) {
                document.getElementById("ingredients").removeChild(allIngredients[allIngredients.length - 1]);
                document.getElementById("amounts").removeChild(allAmounts[allAmounts.length - 1]);
            }
        });

        // submitButton.addEventListener("click", (e) => {
        //     e.preventDefault();
        //     let ingredients = document.querySelectorAll(".ingredient");
        //     let amounts = document.querySelectorAll(".amount");
        //     let values = [];

        //     const formData = new FormData();

        //     let name = document.getElementById("recipe_name").value;

        //     for(let i = 0; i < ingredients.length; i++) {
        //         values.push({
        //             name: ingredients[i].value,
        //             amount: amounts[i].value
        //         })
        //     }

        //     formData.append('recipe_name', name);
        //     formData.append('ingredients', values);

        //     console.log(formData)

        //     fetch("http://localhost:8000/api/recipes/add", {
        //         method: "POST",
        //         headers: {
        //             "Accept": "*/*",
        //             'Content-Type': 'multipart/form-data',
        //         },
        //         body: JSON.stringify(formData)
        //     }).then((response) => response.json()
        //         .then((data) => console.log(data)));
        // });

    </script>
@endsection