import { styled } from '@mui/material/styles';
import axios from 'axios';
import './UsersTable.css';
import {
    IconButton,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFetchUsers } from '../Hooks/useFetchUsers';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));
const StyledTable = styled(Table)(({ theme }) => ({
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
}));

function UsersTable() {
    const { users, usersLoadingError } = useFetchUsers();

    const deleteUser = userId => {
        axios.delete(`${process.env.REACT_APP_BACKDEND_URL}/users/${userId}`);
    };

    return (
        <div>
            <TableContainer>
                <StyledTable
                    sx={{ minWidth: 700 }}
                    aria-label="customized table"
                >
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">
                                Email
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                First name
                            </StyledTableCell>
                            <StyledTableCell align="center">
                                Last name
                            </StyledTableCell>
                            <StyledTableCell align="right">
                                Delete
                            </StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.map(user => (
                            <StyledTableRow key={user.email}>
                                <StyledTableCell component="th" scope="row">
                                    {user.email}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {user.firstname}
                                </StyledTableCell>
                                <StyledTableCell align="center">
                                    {user.lastname}
                                </StyledTableCell>
                                <StyledTableCell align="right">
                                    <IconButton
                                        color="secondary"
                                        aria-label="delete-user"
                                        onClick={() => deleteUser(user.id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </StyledTable>
            </TableContainer>
            {usersLoadingError !== null && (
                <div className="users-loading-error">{usersLoadingError}</div>
            )}
        </div>
    );
}

export default UsersTable;
