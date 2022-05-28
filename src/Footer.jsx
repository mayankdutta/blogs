const Footer = () => {
    const today = new Date();
    return (
        <div>
            <p>Copyright &copy; {today.getFullYear()}</p>

        </div>
    )
}

export default Footer
