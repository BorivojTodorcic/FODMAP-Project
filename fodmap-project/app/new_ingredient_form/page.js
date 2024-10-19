"use client"


import { Box, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Divider, FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography} from '@mui/material/';
import { Fragment, useEffect, useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Fuse from 'fuse.js'




export default function NewRecipeForm(){


	const [openDialog, setOpenDialog] = useState(false);
    const [ingredientName, setIngredientName] = useState("");
    const [ingredientDetail, setIngredientDetail] = useState("");
    const [ingredientCategory, setIngredientCategory] = useState("");
    const [newIngredient, setNewIngredient] = useState({});
	const [ingredientDatabase, setIngredeintDatabase] = useState([]);
	const [filteredIngredients, setFilteredIngredients] = useState();
	const [ingredientCategoriesArray, setIngredeintCategoriesArray] = useState([]);


	// Get a list of all the current ingredient categories from the database
    useEffect(() => {
        fetch("http://localhost:3001/api/all-ingredient-categories")
        .then(response => response.json())
        .then(data => {
            setIngredeintCategoriesArray(data);
        })
    }, []);

	
	// Get a list of all the current ingredients from the database
	useEffect(() => {
		fetch("http://localhost:3001/api/all-ingredients").then(response => response.json())
		.then(data => {
			const mappedData = data.map((item) => (
				{   id: item.ingredient_id,
					name: item.ingredient_name,
					detail: item.ingredient_detail,
					category: item.ingredient_category
                }));
				
				setIngredeintDatabase(mappedData);
				// Set the initial value of filteredIngredients
				// This shows all the ingredients ingredients in the database on initial load
				setFilteredIngredients(mappedData);
			})
		}, []);
		

	// Filter mechanism to check if new ingredient already exists in current database 
	useEffect(() => {
		const fuseOptions = {
			// Threshold: 0 = exact mactch, 1 = matches anything
			threshold: 0.1,
			keys: [
				"name",
				"detail"
			]
		};
		const fuse = new Fuse(ingredientDatabase, fuseOptions);
		// If ingredientName is not an empty string, execute filter function
		if (ingredientName) {
			const tempArray = fuse.search(ingredientName)
			const filteredArray = tempArray.map(row => row.item)
			setFilteredIngredients(filteredArray);

		// Else return default database values
		} else {
			setFilteredIngredients(ingredientDatabase)
		}
		
	}, [ingredientName])
		
		
	// Preview table setup
    const columns = [
		{ field: 'id', headerName: 'ID', width: 100, sortable: false,  },
        { field: 'name', headerName: 'Name', width: 200 },
        { field: 'detail', headerName: 'Detail', width: 200 },
        { field: 'category', headerName: 'Category', width: 300, sortable: false }
      ];

    const paginationModel = { page: 0, pageSize: 10 };


	
	// Handler function:
	const handleClose = () => {
		setOpenDialog(false);
	};


	const handleSaveIngredient = () => {
		const ingredientData = new URLSearchParams(newIngredient).toString();
		fetch('http://localhost:3001/api/new_ingredient_submitted', {
			method:"POST",
			headers:{
				'Content-type': 'application/x-www-form-urlencoded'
			},
			body: ingredientData
		});
		setOpenDialog(false);
	};
	

	const handlePreviewIngredient = (e) => {
        e.preventDefault();
        
        const temp_ingredient_data = {
            name: ingredientName,
            detail: ingredientDetail,
			category: ingredientCategory
            };

		setNewIngredient(temp_ingredient_data);
		setOpenDialog(true);
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
                onSubmit={handlePreviewIngredient}
            >

				<Typography variant="h4" gutterBottom>New Ingredient Form</Typography>

				<TextField
					required
					id="ingredient_name"
					label="Ingredient Name"
					onChange={(e) => setIngredientName(e.target.value)}
				/>

				<TextField
					id="ingredient_detail"
					label="Ingredient Detail"
					onChange={(e) => setIngredientDetail(e.target.value)}
				/>

                <FormControl>
                    <InputLabel>Category</InputLabel>
                    <Select
                        required
                        name={'category'}
                        label="Ingredient Category"
                        autoWidth
                        value={ingredientCategory || ""}
                        onChange={(e) => setIngredientCategory(e.target.value)}
                    >
                        { ingredientCategoriesArray.map(category => (
                            <MenuItem key={category} value={category}>{category}</MenuItem>
                        ))}
                    </Select>
                </FormControl>

				<Button
					variant="contained"
					type='submit'
					sx={{ width: "100%"}}
				>
					Preview Ingredient
				</Button>


				<Divider variant="middle" flexItem />


				<Typography variant="h4" gutterBottom>Ingredient Database</Typography>


				<Paper sx={{ height: 629, width: '100%' }}>
					<DataGrid
						rows={filteredIngredients}
						columns={columns}
						initialState={{ pagination: { paginationModel } }}
						pageSizeOptions={[10, 20, 50]}
						sx={{ border: 0 }}
					/>
				</Paper>


						
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
						<Typography variant="h5" gutterBottom>New Ingredient:</Typography>
					</DialogTitle>

					<DialogContent>
						<DialogContentText id="alert-dialog-description">
							<Typography variant="body1" gutterBottom>Name: {ingredientName}</Typography>
							<Typography variant="body1" gutterBottom>Detail: {ingredientDetail}</Typography>
							<Typography variant="body1" gutterBottom>Category: {ingredientCategory}</Typography>
						</DialogContentText>
					</DialogContent>

					<DialogActions>
						<Button onClick={handleClose}>Cancel</Button>
						<Button onClick={handleSaveIngredient}>Save ingredient</Button>
					</DialogActions>
				</Dialog>
			</Fragment>

        </Box>
    )
};