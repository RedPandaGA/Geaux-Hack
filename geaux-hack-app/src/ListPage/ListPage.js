import * as React from 'react';
import { useRef } from 'react';
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Stack } from '@mui/system';


function createData(name, courseid, required, credithrs, minimumgrade) {
    return {
        name,
        courseid,
        required,
        credithrs,
        minimumgrade,
    };
}

function descendingComparator(a, b, orderBy) {
if (b[orderBy] < a[orderBy]) {
    return -1;
}
if (b[orderBy] > a[orderBy]) {
    return 1;
}
return 0;
}

function getComparator(order, orderBy) {
return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

// This method is created for cross-browser compatibility, if you don't
// need to support IE11, you can use Array.prototype.sort() directly
function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) {
        return order;
        }
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
{
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name',
},
{
    id: 'courseid',
    numeric: false,
    disablePadding: false,
    label: 'Course ID',
},
{
    id: 'required',
    numeric: false,
    disablePadding: false,
    label: 'Required Courses',
},
{
    id: 'credithrs',
    numeric: true,
    disablePadding: false,
    label: 'Credit Hours',
},
{
    id: 'minimumgrade',
    numeric: false,
    disablePadding: false,
    label: 'Minimum Grade',
},
];

function EnhancedTableHead(props) {
const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
};

return (
    <TableHead>
    <TableRow>
        <TableCell padding="checkbox">
        <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
            'aria-label': 'select all desserts',
            }}
        />
        </TableCell>
        {headCells.map((headCell) => (
        <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'left' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
        >
            <TableSortLabel
            active={orderBy === headCell.id}
            direction={orderBy === headCell.id ? order : 'asc'}
            onClick={createSortHandler(headCell.id)}
            >
            {headCell.label}
            {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
            ) : null}
            </TableSortLabel>
        </TableCell>
        ))}
    </TableRow>
    </TableHead>
);
}

/*EnhancedTableHead.propTypes = {
numSelected: PropTypes.number.isRequired,
onRequestSort: PropTypes.func.isRequired,
onSelectAllClick: PropTypes.func.isRequired,
order: PropTypes.oneOf(['asc', 'desc']).isRequired,
orderBy: PropTypes.string.isRequired,
};*/

const EnhancedTableToolbar = (props) => {
    const { numSelected , selected , setSelected, rows, setRows} = props;

    const handleDelete = () =>{
        console.log(selected.length);
        for(let i = 0; i < selected.length; i++){
            var index = rows.map((n) => n.name).indexOf(selected[i]);
            if(index > -1){
                rows.splice(index, 1);
            }
        }
        setRows(rows);
        setSelected([]);
    };
    
    return (
        <Toolbar
        sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 },
            ...(numSelected > 0 && {
            bgcolor: (theme) =>
                alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
            }),
        }}
        >
        {numSelected > 0 ? (
            <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
            >
            {numSelected} selected
            </Typography>
        ) : (
            <Typography
            sx={{ flex: '1 1 100%' }}
            variant="h6"
            id="tableTitle"
            component="div"
            >
            Courses
            </Typography>
        )}

        {numSelected > 0 ? (
            <Tooltip title="Delete">
            <IconButton onClick={handleDelete}>
                <DeleteIcon />
            </IconButton>
            </Tooltip>
        ) : (
            <Tooltip title="Filter list">
            <IconButton>
                <FilterListIcon />
            </IconButton>
            </Tooltip>
        )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
numSelected: PropTypes.number.isRequired,
selected: PropTypes.array
};
//rows.push(createData(nameIn.current.value,courseIdIn.current.value, requiredIn.current.value, credithrsIn.current.value, minimumIn.current.value)
export default function ListPage({outData, setOutData}) {
const [order, setOrder] = React.useState('asc');
const [orderBy, setOrderBy] = React.useState('calories');
const [page, setPage] = React.useState(0);
const [selected, setSelected] = React.useState([]);
const [dense, setDense] = React.useState(false);
const [rowsPerPage, setRowsPerPage] = React.useState(5);
const [rows, setRows] = React.useState(outData);

const nameIn = useRef('');
const courseIdIn = useRef('');
const requiredIn = useRef('');
const credithrsIn = useRef('');
const minimumIn = useRef('');

const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
};

const handleSelectAllClick = (event) => {
    if (event.target.checked) {
        const newSelected = rows.map((n) => n.name);
        setSelected(newSelected);
        return;
    }
    setSelected([]);
};

const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
    newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
    newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
    newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
    newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
    );
    }

    setSelected(newSelected);
};

const handleChangePage = (event, newPage) => {
    setPage(newPage);
};

const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
};

const handleChangeDense = (event) => {
    setDense(event.target.checked);
};

const isSelected = (name) => selected.indexOf(name) !== -1;

const handleSubmit = () => {
    const temp = createData(nameIn.current.value,courseIdIn.current.value, requiredIn.current.value, credithrsIn.current.value, minimumIn.current.value);
    setRows(previous => [...previous, temp]);
    setOutData(previous => [...previous, temp]);
}

// Avoid a layout jump when reaching the last page with empty rows.
const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

return (
    <Box sx={{ width: '100%' }}>
    <Paper sx={{ width: '100%', mb: 2 }}>
        <EnhancedTableToolbar numSelected={selected.length} selected = {selected} setSelected = {setSelected} rows = {rows} setRows = {setRows} />
        <TableContainer>
        <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
        >
            <EnhancedTableHead
            numSelected={selected.length}
            order={order}
            orderBy={orderBy}
            onSelectAllClick={handleSelectAllClick}
            onRequestSort={handleRequestSort}
            rowCount={rows.length}
            />
            <TableBody>
            {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                rows.slice().sort(getComparator(order, orderBy)) */}
            {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                const isItemSelected = isSelected(row.name);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                    <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.name)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.name}
                    selected={isItemSelected}
                    >
                    <TableCell padding="checkbox">
                        <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{
                            'aria-labelledby': labelId,
                        }}
                        />
                    </TableCell>
                    <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                    >
                        {row.name}
                    </TableCell>
                    <TableCell align="left">{row.courseid}</TableCell>
                    <TableCell align="left">{row.required}</TableCell>
                    <TableCell align="left">{row.credithrs}</TableCell>
                    <TableCell align="left">{row.minimumgrade}</TableCell>
                    </TableRow>
                );
                })}
            {emptyRows > 0 && (
                <TableRow
                style={{
                    height: (dense ? 33 : 53) * emptyRows,
                }}
                >
                <TableCell colSpan={6} />
                </TableRow>
            )}
            </TableBody>
        </Table>
        </TableContainer>
        <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        />
    </Paper>
    <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
    />
    <div style={{padding: 8}}></div>
    <Stack direction = "row" spacing={2}>
        <TextField
            required
            id="1"
            label="Course Name"
            inputRef={nameIn}
        />
        <TextField
            required
            id="2"
            label="Course ID"
            inputRef={courseIdIn}
        />
        <TextField
            required
            id="3"
            label="Required Courses"
            inputRef={requiredIn}
        />
        <TextField
            required
            id="4"
            label="Credit Hours"
            type="number"
            inputRef={credithrsIn}
        />
        <TextField
            required
            id="5"
            label="Minimum Grade"
            inputRef={minimumIn}
        />
        <Button variant="contained" onClick={handleSubmit}>
            Submit
        </Button>
    </Stack>
    </Box>
);
}