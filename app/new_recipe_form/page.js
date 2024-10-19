"use client"



import { Autocomplete, Box, Button, Chip, Checkbox, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Divider, FormControl, FormControlLabel, FormGroup, FormLabel, InputAdornment, InputLabel, MenuItem, OutlinedInput, Radio, RadioGroup, Select, Stack, TextField, Typography} from '@mui/material/';
import { Fragment, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import DeleteIcon from '@mui/icons-material/Delete';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';



export default function NewRecipeForm(){


	const [ingredientDatabase, setIngredeintDatabase] = useState([]);

	useEffect(() => {
		fetch("http://localhost:3001/api/all-ingredients").then(response => response.json())
		.then(data => {
			const mappedData = data.map((item) => ({...item, amount: 0, unit: ''}))
			setIngredeintDatabase(mappedData)})
	}, []);

    const [mealName, setMealName] = useState('');
	const [imageFile, setImageFile] = useState();
	const VisuallyHiddenInput = styled('input')({
		clip: 'rect(0 0 0 0)',
		clipPath: 'inset(50%)',
		height: 1,
		overflow: 'hidden',
		position: 'absolute',
		bottom: 0,
		left: 0,
		whiteSpace: 'nowrap',
		width: 1,
	  });
    const [cookingTime, setCookingTime] = useState('');
    const [servingAmount, setServingAmount] = useState(0);
    const [dietType, setDietType] = useState([]);
    const [mealType, setMealType] = useState('');
    const [ingredientList, setIngredientList] = useState([]);
    const [recipeDetails, setRecipeDetails] = useState({
		name: "",
		image: "",
		time: 0,
		servings: 0,
		meal_type: "",
		diet: [],
		ingredients: [],
		steps: {}
	});
	const [selectedUnits, setSelectedUnits] = useState({});
	const [stepsObject, setStepsObject] = useState({1:""});
	const [openDialog, setOpenDialog] = useState(false);


	const handleClose = () => {
		setOpenDialog(false);
	};

	const handleSaveRecipe = () => {
		const fd = new FormData();
		fd.append('recipe_details', JSON.stringify(recipeDetails))
		fd.append('recipe_image', imageFile)
		fetch('http://localhost:3001/api/new_recipe_submitted', {
			method:"POST",
			body: fd
		});
		setOpenDialog(false);
	}

	const handleDeleteMethodStep = () => {
		let methodCount = Object.keys(stepsObject).length;
		const newMethodObject = { ...stepsObject };
		delete newMethodObject[methodCount];
		setStepsObject(newMethodObject);
	};

	const handleNewStep = () => {
		let methodCount = Object.keys(stepsObject).length + 1;
		setStepsObject((prevMethods) => ({
			...prevMethods,
			[methodCount]: ""
		}));
	};

	const handleStepChange = (stepIndex, event) => {
		setStepsObject((prevSteps) => ({
			...prevSteps,
			[stepIndex]: event.target.value
		}));

	};

    const handleIngredientChange = (event, values) => {
        setIngredientList(values)
    };

    const handleDietChange = (e) => { 
        const {value, checked} = e.target;

        if(checked){
            setDietType([...dietType, value]);
        } else {
            setDietType(dietType.filter((e) => e !== value))
        }

    };

	const handleIngredientAmount = (ingredientId, event) => {
		ingredientList.map( (ingredient) => {
			if (ingredient.ingredient_id === ingredientId ){
				ingredient.amount = Number(event.target.value);
			}
		})
	};

	const handleIngredientUnit = (ingredientId, event) => {
		const { value } = event.target;

		setSelectedUnits((prevState) => ({
			...prevState,
			[ingredientId]: value
		}))
		
		ingredientList.map( (ingredient) => {
			if ( ingredient.ingredient_id === ingredientId ) {
				ingredient.unit = value;
			}
		})
	};
	

	const handlePreviewRecipeDetails = (e) => {
        e.preventDefault()

        function validateRecipeData(data) {
            
            const requiredFields = ['name', 'image', 'time', 'meal_type', 'ingredients', 'servings', 'steps']; // Object keys to be validated (skipping 'diet')
          
            // Loop through each key and check for null/empty values
            for (let field of requiredFields) {
              if (!data[field] || data[field].length === 0) {
                return false;  // Return false if any required field is null or empty
              }
            }
            return true;  // Return true if all required fields are valid
          };
        
        const temp_recipe_data = {
            name: mealName,
            image: imageFile.name,
            time: Number(cookingTime),
            servings: Number(servingAmount),
            meal_type: mealType,
            diet: dietType,
            ingredients: ingredientList,
			steps: stepsObject
            }
        
        // const formComplete = validateRecipeData(temp_recipe_data);
        const formComplete = true;			// Used for debugging
        

        if (formComplete) {
            setRecipeDetails(temp_recipe_data);
			setOpenDialog(true);

        } else {
            alert("Incomplete form!")
        }

    };



    return (
        <Box sx={{ width: '100%'}}>

            <Stack
                component="form"
                noValidate
                autoComplete="off"
                spacing={3}
                sx={{
					width: 800,
					margin: 10,
				}}
                onSubmit={handlePreviewRecipeDetails}
            >

				<Typography variant="h4" gutterBottom>Recipe Details</Typography>

				<TextField
					required
					id="meal_name"
					label="Recipe Title"
					onChange={(e) => setMealName(e.target.value)}
				/>

				<Button
					component="label"
					role={undefined}
					variant="contained"
					tabIndex={-1}

					startIcon={<CloudUploadIcon />}
				>
					{ !imageFile ? "Upload image" : imageFile.name }
				<VisuallyHiddenInput
					type="file"
					onChange={(e) => setImageFile(e.target.files[0])}
					multiple
				/>
				</Button>

				<TextField
					required
					sx={{width: 200}}
					id="cooking_time"
					label="Cooking Time (mins)"
					type="number"
					onChange={(e) => setCookingTime(e.target.value)}
					slotProps={{
						inputLabel: {
						shrink: true,
						},
					}}
				/>

				<TextField
					required
					sx={{width: 200}}
					id="servings"
					label="Servings"
					type="number"
					onChange={(e) => setServingAmount(e.target.value)}
					slotProps={{
						inputLabel: {
						shrink: true,
						},
					}}
				/>

				<FormControl>
					<FormLabel id="diet-type">Diet Type</FormLabel>
					<FormGroup
						row
					>
						<FormControlLabel
							control={<Checkbox />}
							value='vegan'
							label="Vegan"
							onChange={handleDietChange}
						/>
						<FormControlLabel
							control={<Checkbox />}
							value='vegetarian'
							label="Vegetarian"
							onChange={handleDietChange}
						/>
						<FormControlLabel
							control={<Checkbox />}
							value='gluten_free'
							label="Gluten Free"
							onChange={handleDietChange}
						/>
						<FormControlLabel
							control={<Checkbox />}
							value='high_fodmap'
							label="High FODMAP"
							onChange={handleDietChange}
						/>
						<FormControlLabel
							control={<Checkbox />}
							value='low_fodmap'
							label="Low FODMAP"
							onChange={handleDietChange}
						/>
					</FormGroup>
				</FormControl>

				<FormControl>
					<FormLabel required id="meal-type">Meal Type</FormLabel>
					<RadioGroup
						row
						aria-labelledby="meal-type"
						name="meal-type-radio-buttons-group"
						onChange={(e) => setMealType(e.target.value)}
					>
						<FormControlLabel value="breakfast" control={<Radio />} label="Breakfast" />
						<FormControlLabel value="main" control={<Radio />} label="Lunch or Dinner" />
						<FormControlLabel value="snack" control={<Radio />} label="Snack" />
					</RadioGroup>
				</FormControl>


				<Divider variant="middle" flexItem />


				<Typography variant="h5" gutterBottom>Recipe Ingredients</Typography>

				<Autocomplete
					multiple
					sx={{ width: 800 }}
					id="ingredients_list"
					options={ingredientDatabase}
					getOptionLabel={(option) => `${option.ingredient_name} (${option.ingredient_detail})`}
					getOptionKey={(option) => `${option.ingredient_id}`}
					onChange={handleIngredientChange}
					renderInput={(params) => (
						<TextField
							{...params}
							label="Ingredients"
						/>
					)}
				/>
					
				{ingredientList.map((ingredient) => (

					<Grid
						key={`${ingredient.ingredient_id}`}
						container
						sx={{width:"100%", justifyContent:"space-between"}}
						spacing={3}
					>
						<Grid size={4} display="flex" alignItems="center">
							<Chip
								variant='outlined'
								label={`${ingredient.ingredient_name} (${ingredient.ingredient_detail})`}
								sx={{width:200}}
							/>
						</Grid>
						<Grid size={4}>
							<TextField
								required
								name={`${ingredient.ingredient_name}_amount`}
								id={`${ingredient.ingredient_id}`}
								type="number"
								label="Quantity"
								onChange={(event) => handleIngredientAmount(ingredient.ingredient_id, event)}
							/>
						</Grid>
						<Grid size={4}>
							<FormControl>
								<InputLabel>Units</InputLabel>
								<Select
									required
									sx={{width:200}}
									name={`${ingredient.ingredient_id}_units`}
									label="Units"
									autoWidth
									value={selectedUnits[ingredient.ingredient_id] || ""}
									onChange={(event) => handleIngredientUnit(ingredient.ingredient_id, event)}
								>
									<MenuItem value={'g'}>Gram</MenuItem>
									<MenuItem value={'kg'}>Kilogram</MenuItem>
									<MenuItem value={'ml'}>Milliliters</MenuItem>
									<MenuItem value={'l'}>Litres</MenuItem>
									<MenuItem value={'tbsp'}>Tablespoons</MenuItem>
									<MenuItem value={'tsp'}>Teaspoons</MenuItem>
									<MenuItem value={'whole'}>Whole</MenuItem>
								</Select>
							</FormControl>
						</Grid>
					</Grid>
				))}


				<Divider variant="middle" flexItem />


				<Typography variant="h5" gutterBottom>Recipe Method</Typography>

				{Object.keys(stepsObject).map((method_key) => (
					<FormControl fullWidth key={`recipe-step-${method_key}`}>
						<OutlinedInput
							id={`step-${method_key}`}
							onChange={(event) => handleStepChange(method_key, event)}
							startAdornment={<InputAdornment position="start">Step {method_key}</InputAdornment>}
						/>
					</FormControl>
				))}
					
				<Stack 
					direction="row"
					spacing={3}
					sx={{
						width: "100%",
						justifyContent: "space-between"
						}}
				>

					<Button 
						sx={{width:200}}
						variant="contained"
						onClick={handleNewStep}
					>
						Add new step
					</Button>

					<Button 
						startIcon={<DeleteIcon />}
						sx={{width:200}}
						variant="contained"
						color="error"
						onClick={handleDeleteMethodStep}
					>
						Delete step
					</Button>

				</Stack >

				<Button
					variant="contained"
					type='submit'
					sx={{ width: "100%"}}
				>
					Preview Recipe
				</Button>
						
            </Stack>
			

			<Fragment>
				<Dialog
					open={openDialog}
					onClose={handleClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
					fullWidth={true}
					maxWidth="lg"
				>
					<DialogTitle id="alert-dialog-title">
					<Typography variant="h3" gutterBottom>{recipeDetails.name}</Typography>
					</DialogTitle>

					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							<Typography variant="h5" gutterBottom>Image File Name:</Typography>
							<Typography variant="body1" gutterBottom>{recipeDetails.image}</Typography>

							<Divider variant="middle" flexItem />

							<Typography variant="h5" gutterBottom>Cooking time:</Typography>
							<Typography variant="body1" gutterBottom>{recipeDetails.time}</Typography>

							<Divider variant="middle" flexItem />

							<Typography variant="h5" gutterBottom>Servings:</Typography>
							<Typography variant="body1" gutterBottom>{recipeDetails.servings}</Typography>

							<Divider variant="middle" flexItem />

							<Typography variant="h5" gutterBottom>Diet Type:</Typography>
							{recipeDetails.diet.map((type) => {
								return (
									<Typography variant="body1" gutterBottom>{type}</Typography>
								)
							})}

							<Divider variant="middle" flexItem />

							<Typography variant="h5" gutterBottom>Meal Type:</Typography>
							<Typography variant="body1" gutterBottom>{recipeDetails.meal_type}</Typography>

							<Divider variant="middle" flexItem />

							<Typography variant="h5" gutterBottom>Ingredients:</Typography>
							{recipeDetails.ingredients.map((ingredient) => {
								return (
									<Typography variant="body1" gutterBottom>{`${ingredient.ingredient_id}: ${ingredient.ingredient_name} (${ingredient.ingredient_detail}) ${ingredient.amount} ${ingredient.unit}`}</Typography>
								)
							})}

							<Divider variant="middle" flexItem />

							<Typography variant="h5" gutterBottom>Steps:</Typography>
							{ Object.keys(recipeDetails.steps).map((key) => {
								return (
									<Typography variant="body1" gutterBottom>{`Step ${key}) ${recipeDetails.steps[key]}`}</Typography>
								)
							})}
						</DialogContentText>
					</DialogContent>

					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button onClick={handleSaveRecipe} autoFocus>Save recipe</Button>
					</DialogActions>
				</Dialog>
			</Fragment>
        </Box>
    )
};